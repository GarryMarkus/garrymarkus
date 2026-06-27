import { getAllPosts } from "@/lib/posts";
import { BlogSplitView } from "@/components/BlogSplitView";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "My Notebook | Garry Markus",
};

export default async function BlogPage() {
  const posts = getAllPosts();
  
  // For the initial list render, we also need to fetch the contentHtml of the first post
  // so the preview is ready.
  if (posts.length > 0) {
    const { getPostBySlug } = await import("@/lib/posts");
    const fullFirstPost = await getPostBySlug(posts[0].slug);
    if (fullFirstPost) {
      posts[0] = fullFirstPost;
    }
  }

  // To make all posts clickable quickly without loading states, we can fetch all HTMLs
  // since this is server-side and probably a small blog.
  const { getPostBySlug } = await import("@/lib/posts");
  const fullPosts = await Promise.all(
    posts.map(async (p) => {
      const full = await getPostBySlug(p.slug);
      return full || p;
    })
  );

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Nav showLinks={false} />
      <div className="flex-1 mt-[56px] overflow-hidden">
        <BlogSplitView posts={fullPosts} />
      </div>
    </div>
  );
}
