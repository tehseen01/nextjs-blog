"use client";

import RightAside from "@/components/RightAside";
import SideNav from "@/components/SideNav";
import PostCard from "@/components/posts/PostCard";
import { TPost } from "@/lib/types";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<TPost[]> => {
      try {
        const { data } = await axios.get("/api/posts/all");
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  return (
    <div className="lg:p-6 md:p-4 py-2">
      <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg gap-4">
        <aside className="max-md:hidden relative">
          <SideNav />
        </aside>
        <main>
          <header className="mb-2">
            <Button variant="light">For you</Button>
            <Button variant="light">Latest</Button>
            <Button variant="light">Trending</Button>
          </header>
          {data &&
            data.length > 0 &&
            data.map((blogPost) => (
              <PostCard key={blogPost.id} post={blogPost} />
            ))}
        </main>
        <RightAside />
      </div>
    </div>
  );
}
