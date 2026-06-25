import { getAllPosts } from "@/lib/posts";
import { HomeContent } from "@/components/HomeContent";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3).map((p) => p.meta);

  return (
    <PageTransition>
      <HomeContent recentPosts={recentPosts} />
    </PageTransition>
  );
}
