/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const { markedHighlight } = require("marked-highlight");
const markedKatex = require("marked-katex-extension");
const hljs = require("highlight.js");

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Add KaTeX support for Obsidian-style math ($ inline $, $$ display $$)
marked.use(markedKatex({
  throwOnError: false,
  output: "html",
  nonStandard: true // Crucial for parsing inline math like ($S_A$)
}));

// Custom renderer to add IDs to headings automatically
const renderer = new marked.Renderer();
renderer.heading = function(token) {
  const text = this.parser.parseInline(token.tokens);
  // Create a clean slug from the raw text
  const rawText = token.raw.replace(/^#+\s*/, '').trim(); 
  const slug = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `<h${token.depth} id="${slug}">${text}</h${token.depth}>\n`;
};
marked.use({ renderer });

const NOTEBOOK_DIR = path.join(__dirname, "../notebook");
const PUBLIC_ATTACHMENTS_DIR = path.join(__dirname, "../public/attachments");
const OUTPUT_FILE = path.join(__dirname, "../src/lib/posts.gen.ts");

function compilePosts() {
  if (!fs.existsSync(NOTEBOOK_DIR)) {
    fs.mkdirSync(NOTEBOOK_DIR, { recursive: true });
    console.log(`Created directory: ${NOTEBOOK_DIR}`);
  }

  // Ensure public attachments dir exists
  if (!fs.existsSync(PUBLIC_ATTACHMENTS_DIR)) {
    fs.mkdirSync(PUBLIC_ATTACHMENTS_DIR, { recursive: true });
  }

  const posts = [];
  
  // Dynamically detect all categories based on folders present
  const categoryDirs = fs.readdirSync(NOTEBOOK_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Keep "OTHER" at the end if it exists
  const sortedCategories = categoryDirs.sort((a, b) => {
    if (a === "OTHER") return 1;
    if (b === "OTHER") return -1;
    return a.localeCompare(b);
  });

  for (const categoryName of sortedCategories) {
    const categoryPath = path.join(NOTEBOOK_DIR, categoryName);
    
    // Process attachments folder if it exists directly in the category folder
    const attachmentsPath = path.join(categoryPath, "attachments");
    if (fs.existsSync(attachmentsPath)) {
      const publicDestPath = path.join(PUBLIC_ATTACHMENTS_DIR, categoryName);
      if (!fs.existsSync(publicDestPath)) {
        fs.mkdirSync(publicDestPath, { recursive: true });
      }

      const attachmentFiles = fs.readdirSync(attachmentsPath, { withFileTypes: true });
      for (const file of attachmentFiles) {
        if (file.isFile()) {
          fs.copyFileSync(
            path.join(attachmentsPath, file.name),
            path.join(publicDestPath, file.name)
          );
        }
      }
    }

    // Read files directly in the category folder
    const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

      const mdFile = entry.name;
      const fileNameWithoutExt = path.basename(mdFile, ".md");
      const mdPath = path.join(categoryPath, mdFile);
      const mdContent = fs.readFileSync(mdPath, "utf8");

      // Parse frontmatter
      const { data, content } = matter(mdContent);

      // Process content: rewrite local attachment URLs
      // e.g. ![](attachments/image.png) or ![](./attachments/image.png)
      // to /attachments/categoryName/image.png
      let processedContent = content.replace(
        /(!\[.*?\]\()(\.\/)?attachments\/(.*?\))/g,
        `$1/attachments/${categoryName}/$3`
      );
      processedContent = processedContent.replace(
        /(src=")(\.\/)?attachments\/(.*?)"/g,
        `$1/attachments/${categoryName}/$3"`
      );

      // Support Obsidian WikiLink Image Syntax: ![[image.png]] or ![[image.png|size]]
      // Rewrites to standard markdown image pointing to /attachments/categoryName/image.png
      processedContent = processedContent.replace(
        /!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g,
        (match, filename, captionOrSize) => {
          const cleanFilename = filename.trim();
          const alt = captionOrSize ? captionOrSize.trim() : cleanFilename;
          const encodedFilename = encodeURI(cleanFilename);
          return `![${alt}](/attachments/${categoryName}/${encodedFilename})`;
        }
      );

      // Support Obsidian Highlight Syntax: ==highlight== -> <mark>highlight</mark>
      processedContent = processedContent.replace(/==([^=]+)==/g, "<mark>$1</mark>");

      // Compile markdown to HTML
      const html = marked.parse(processedContent);

      // Extract title from frontmatter or first heading
      let extractedTitle = data.title || data.TITLE;
      if (!extractedTitle) {
        const headingMatch = content.match(/^\s*#+\s+(.+)$/m);
        if (headingMatch) {
          extractedTitle = headingMatch[1].trim();
        }
      }
      
      const title = extractedTitle || fileNameWithoutExt;
      let slug = data.slug || title;
      
      // Sanitize slug to make it safe for filesystems and URLs
      slug = slug
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-") // replace any non-safe character with a hyphen
        .replace(/-+/g, "-")          // collapse consecutive hyphens
        .replace(/^-+|-+$/g, "");      // trim leading/trailing hyphens

      // Create a clean excerpt without markdown characters
      let cleanContent = content
        .replace(/^\s*#+.*$/gm, "") // remove entire heading lines
        .replace(/[*_~`>\[\]]/g, "") // remove formatting characters
        .replace(/\n+/g, " ")        // replace newlines with spaces
        .replace(/\s+/g, " ")        // collapse spaces
        .trim();

      const excerpt = data.excerpt || (cleanContent.slice(0, 100) + "...");
      
      // Calculate reading time
      const wordCount = content.trim().split(/\s+/).length;
      const readTime = data.readTime || `${Math.ceil(wordCount / 200)} min read`;

      // Process date into nice format
      let dateObj;
      if (data.date) {
        dateObj = new Date(data.date);
      }
      
      if (!dateObj || isNaN(dateObj.getTime())) {
        const stats = fs.statSync(mdPath);
        dateObj = stats.birthtime || stats.mtime;
      }

      const rawDate = dateObj.toISOString();

      let dateStr = data.date;
      if (!dateStr) {
        dateStr = dateObj.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric"
        });
      }

      posts.push({
        slug,
        title,
        date: dateStr,
        rawDate, // ISO string for sorting
        readTime,
        excerpt,
        tags: data.tags || [],
        category: categoryName,
        contentHtml: html
      });
    }
  }

  // Sort by rawDate ascending (oldest first)
  posts.sort((a, b) => a.rawDate.localeCompare(b.rawDate));

  // Write generator ts file
  const tsContent = `// This file is auto-generated. Do not edit manually.
export interface GeneratedPost {
  slug: string;
  title: string;
  date: string;
  rawDate: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  category: string;
  contentHtml: string;
}

export const categories: string[] = ${JSON.stringify(sortedCategories, null, 2)};
export const posts: GeneratedPost[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf8");
  console.log(`[Success] Compiled ${posts.length} posts to ${OUTPUT_FILE}`);
}

compilePosts();
