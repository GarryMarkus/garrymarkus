import { getAllPosts } from "@/lib/posts";
import { NotebookArchive } from "@/components/NotebookArchive";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "My Notebook | Garry Markus",
};

export default async function BlogPage() {
  const posts = getAllPosts();
  
  // We no longer need to fetch full HTML content since we are not previewing in a split view.
  // The NotebookArchive just renders the list. The user goes to [slug]/page.tsx to see the full content.
  
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative bg-bg">
      <Nav showLinks={false} />
      <div className="flex-1 mt-[48px] sm:mt-[56px] relative z-10">
        <NotebookArchive posts={posts} />
      </div>
    </div>
  );
}
