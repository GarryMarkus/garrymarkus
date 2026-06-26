# GARRYMARKUS — Portfolio

Minimal, dark personal portfolio inspired by Obsidian and Hyperland.

## Stack

- **Next.js** (App Router, static export)
- **Plain CSS** (`globals.css`)
- **Space Mono** — UI text, nav, labels
- **EB Garamond** — blog titles, body, excerpts

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — centered wordmark, rotating tagline, resume link, social icons |
| `/blog` | Blog list — post rows with title, excerpt, date, read time |
| `/blog/[slug]` | Blog post — essay layout with drop cap |

## How to add a new blog post

1. Open `src/lib/posts.ts`
2. Add a new object to the `posts` array:

```ts
{
  slug: "your-post-slug",
  title: "Your Post Title",
  date: "Month Year",
  readTime: "X min read",
  excerpt: "One-line summary.",
  body: [
    "First paragraph...",
    "Second paragraph...",
  ],
}
```

3. The post will automatically appear on the blog list page and get its own route at `/blog/your-post-slug`.

## How to wire up a real CMS

Replace the functions in `src/lib/posts.ts`:
- `getAllPosts()` — fetch all posts from your CMS
- `getPostBySlug(slug)` — fetch a single post

The `Post` interface defines the shape your data needs to match.

## Development

```bash
npm run dev    # Start dev server
npm run build  # Static export to /out
```

## Links

- Resume: `/public/resume.pdf`
- Favicon: `/public/favicon.svg`
