"use client";

import SideNav from "@/components/SideNav";
import PostCard from "@/components/posts/PostCard";
import { Button, ButtonGroup } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="lg:p-6 md:p-4 py-2 bg-gray-100">
      <div className="grid grid-cols-sm md:grid-cols-md lg:grid-cols-lg gap-4">
        <aside className="max-md:hidden">
          <SideNav />
        </aside>
        <main>
          <header className="mb-2">
            <Button variant="light">For you</Button>
            <Button variant="light">Latest</Button>
            <Button variant="light">Trending</Button>
          </header>
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCard key={index} />
          ))}
        </main>
        <aside className="border max-lg:hidden">Right aside</aside>
      </div>
    </div>
  );
}
