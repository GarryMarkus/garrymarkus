---
title: "Day 2: Testing the Markdown Editorial Engine"
date: "June 26, 2026"
readTime: "3 min read"
excerpt: "This is a live test of our new date-directory-based Markdown blog compilation system."
slug: "testing-the-markdown-editorial-engine"
---

Welcome to the new blogging system! This post is compiled dynamically from a raw markdown file stored in `/notebook/2026-06-26/post.md`.

Here is a quick look at the features supported:

## 1. Bold and Italic Styling

You can write standard Markdown elements. For example, **this is bold text** and *this is italicized text*. You can also write `inline code` for technical terms.

## 2. Structured Lists

Here is a bulleted list:
- **Brutalist Grid Layout**: Perfectly aligns with site dimensions.
- **Auto-compiling Script**: Instantly compiles on `npm run dev` or `build`.
- **Easy Media Attachments**: Place images in `attachments/` inside the date folder.

And here is a numbered list of features:
1. Markdown Frontmatter Parsing (slug, title, date, excerpt, readTime).
2. Word count automatic reading time estimation.
3. Path rewriting of relative image URLs to match `/public` exports.

## 3. Code Highlighting

Here is an example JavaScript code block:

```javascript
const compilePosts = require('./scripts/compile-posts');

// Compile notebook markdown files on dev server reload
compilePosts.watch();
```

## 4. Blockquotes

> "The details are not the details. They make the design."
> — Charles Eames

Enjoy the new streamlined writing workflow!
