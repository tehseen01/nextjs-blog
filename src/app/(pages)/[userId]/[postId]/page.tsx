"use client";
import PostArticle from "@/components/posts/PostArticle";
import UserProfileCard from "@/components/posts/UserProfileCard";
import { TPost } from "@/lib/types";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

type TPostProp = {
  params: { postId: string };
};

const Page = ({ params }: TPostProp) => {
  const { data, isLoading } = useQuery(["post", params.postId], {
    queryFn: async (): Promise<TPost> => {
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)] text-xl flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_350px] p-2 md:py-6 md:px-16 h-full gap-8">
      <section>
        {data && Object.entries(data).length > 0 && <PostArticle post={data} />}
      </section>
      <aside className="">
        {data && Object.entries(data).length > 0 && (
          <UserProfileCard user={data.author} />
        )}
      </aside>
    </main>
  );
};

export default Page;
