# GarryMarkus Portfolio & Notebook

**Hi, this is GarryMarkus. I can teach you how to break your system down to its roots and build it back up again.**

This is a personal portfolio and markdown-powered blog (notebook) built with a focus on deep aesthetics, performance, and responsive design. 

## 🚀 Features

- **Dynamic Interactive Background**: A custom `canvas`-based constellation effect that reacts to mouse movement and clicks.
- **Markdown Notebook**: A fully functional blog system that parses local `.md` files using `gray-matter`, `remark`, and `rehype`. Supports syntax highlighting, math equations (KaTeX), and GitHub-flavored markdown.
- **Tufte-Inspired Layout**: The blog posts feature an elegant reading experience with a sidebar for metadata (dates, reading time, tags) on large screens, folding cleanly on mobile.
- **Responsive Architecture**: Carefully crafted with Tailwind CSS to provide a beautiful, uncluttered experience across all devices from ultra-wide desktops to 320px mobile screens.
- **Framer Motion Animations**: Smooth page transitions, staggered layout reveals, and elegant micro-interactions.
- **Dark/Light Mode**: Full theme support via `next-themes`.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown Processing**: remark, rehype, rehype-highlight, rehype-katex, remark-math
- **Deployment**: Vercel (Recommended)

## 💻 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/garrymarkus/garrymarkus.git
   cd garrymarkus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Writing Posts

To add a new entry to the notebook:
1. Create a new `.md` file inside the `content/posts/` directory.
2. Add the required frontmatter at the top of the file:
   ```markdown
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   excerpt: "A short description of the post."
   tags: ["Tag1", "Tag2"]
   ---
   ```
3. Write your content below the frontmatter using standard Markdown.

## 📜 License

This project is open-source and available under the MIT License.
