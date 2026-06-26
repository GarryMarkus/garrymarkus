const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

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
  const entries = fs.readdirSync(NOTEBOOK_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const folderName = entry.name; // YYYY-MM-DD
    const folderPath = path.join(NOTEBOOK_DIR, folderName);

    // Read files in this folder
    const files = fs.readdirSync(folderPath);
    const mdFile = files.find(f => f.endsWith(".md"));

    if (!mdFile) {
      console.warn(`[Warning] No markdown file found in ${folderPath}`);
      continue;
    }

    const mdPath = path.join(folderPath, mdFile);
    const mdContent = fs.readFileSync(mdPath, "utf8");

    // Parse frontmatter
    const { data, content } = matter(mdContent);

    // Handle attachments folder
    const attachmentsPath = path.join(folderPath, "attachments");
    if (fs.existsSync(attachmentsPath)) {
      const publicDestPath = path.join(PUBLIC_ATTACHMENTS_DIR, folderName);
      if (!fs.existsSync(publicDestPath)) {
        fs.mkdirSync(publicDestPath, { recursive: true });
      }

      // Copy all files
      const attachmentFiles = fs.readdirSync(attachmentsPath);
      for (const file of attachmentFiles) {
        fs.copyFileSync(
          path.join(attachmentsPath, file),
          path.join(publicDestPath, file)
        );
      }
    }

    // Process content: rewrite local attachment URLs
    // e.g. ![](attachments/image.png) or ![](./attachments/image.png)
    // to /attachments/YYYY-MM-DD/image.png
    let processedContent = content.replace(
      /(!\[.*?\]\()(\.\/)?attachments\/(.*?\))/g,
      `$1/attachments/${folderName}/$3`
    );
    processedContent = processedContent.replace(
      /(src=")(\.\/)?attachments\/(.*?)"/g,
      `$1/attachments/${folderName}/$3"`
    );

    // Support Obsidian WikiLink Image Syntax: ![[image.png]] or ![[image.png|size]]
    // Rewrites to standard markdown image pointing to /attachments/YYYY-MM-DD/image.png
    processedContent = processedContent.replace(
      /!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g,
      (match, filename, captionOrSize) => {
        const cleanFilename = filename.trim();
        const alt = captionOrSize ? captionOrSize.trim() : cleanFilename;
        const encodedFilename = encodeURI(cleanFilename);
        return `![${alt}](/attachments/${folderName}/${encodedFilename})`;
      }
    );

    // Support Obsidian Highlight Syntax: ==highlight== -> <mark>highlight</mark>
    processedContent = processedContent.replace(/==([^=]+)==/g, "<mark>$1</mark>");

    // Compile markdown to HTML
    const html = marked.parse(processedContent);

    // Calculate dynamic fallbacks
    const title = data.title || folderName;
    let slug = data.slug || folderName;
    
    // Sanitize slug to make it safe for filesystems and URLs
    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-") // replace any non-safe character with a hyphen
      .replace(/-+/g, "-")          // collapse consecutive hyphens
      .replace(/^-+|-+$/g, "");      // trim leading/trailing hyphens

    const excerpt = data.excerpt || (content.slice(0, 150).replace(/\s+/g, " ") + "...");
    
    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = data.readTime || `${Math.ceil(wordCount / 200)} min read`;

    // Process date into nice format
    // E.g. 2025-06-26 -> June 26, 2025
    let dateStr = data.date;
    if (!dateStr) {
      const parts = folderName.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, monthIndex, day);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            day: "numeric"
          });
        }
      }
      if (!dateStr) {
        dateStr = folderName;
      }
    }

    posts.push({
      slug,
      title,
      date: dateStr,
      rawDate: folderName, // keep folderName for sorting
      readTime,
      excerpt,
      html
    });
  }

  // Sort by rawDate descending (newest first)
  posts.sort((a, b) => b.rawDate.localeCompare(a.rawDate));

  // Write generator ts file
  const tsContent = `// This file is auto-generated. Do not edit manually.
export interface GeneratedPost {
  slug: string;
  title: string;
  date: string;
  rawDate: string;
  readTime: string;
  excerpt: string;
  html: string;
}

export const posts: GeneratedPost[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf8");
  console.log(`[Success] Compiled ${posts.length} posts to ${OUTPUT_FILE}`);
}

compilePosts();
