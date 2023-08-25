"use client";
import UserProfileCard from "@/components/posts/UserProfileCard";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

type TPost = {
  params: { postId: string };
};

const Page = ({ params }: TPost) => {
  const { data } = useQuery(["post", params.postId], {
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      return data;
    },
  });

  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_350px] p-2 md:p-6 h-full">
      <section>
        <article>
          <h1>{data && data.title}</h1>
        </article>
      </section>
      <aside className="">
        <UserProfileCard />
      </aside>
    </main>
  );
};

export default Page;
