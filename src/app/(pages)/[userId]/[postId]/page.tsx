"use client";
import PostArticle from "@/components/posts/PostArticle";
import UserProfileCard from "@/components/posts/UserProfileCard";
import { TPost } from "@/lib/types";
import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import Footer from "@/components/Footer";

type TPostProp = {
  params: { postId: string };
};

const Page = ({ params }: TPostProp) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: async (): Promise<TPost> => {
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      return data;
    },
    retry: 1,
  });

  if (isError) {
    throw new Error("Oops something went wrong.");
  }

  if (isLoading) {
    return (
      <div className="sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)] text-xl flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[65%_35%] p-2 md:py-6 md:px-16 h-full gap-4">
        <section>
          {data && Object.entries(data).length > 0 && (
            <PostArticle post={data} />
          )}
        </section>
        <aside className="">
          {data && Object.entries(data).length > 0 && (
            <>
              <UserProfileCard post={data} />
              <Card className="border mt-8" shadow="none" radius="sm">
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    More from{" "}
                    <Link
                      href={`/${data.author.username}`}
                      className="text-primary hover:text-primary-600"
                    >
                      {data.author.username}
                    </Link>
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody className="px-0 pb-0">
                  {data.author.posts.map((post) => (
                    <div key={post.id} className="">
                      <Link href={post.path} className="p-4 flex gap-3 group">
                        <Avatar src={data.author.avatar} size="sm" />
                        <div>
                          <h5 className="group-hover:text-primary">
                            {post.title}
                          </h5>
                          <div className="flex gap-2 mt-2 text-default-500">
                            <span className="text-sm">#Javascript</span>
                            <span className="text-sm">#React js</span>
                            <span className="text-sm">#Next.js</span>
                            <span className="text-sm">#CSS</span>
                          </div>
                        </div>
                      </Link>
                      <Divider />
                    </div>
                  ))}
                </CardBody>
              </Card>
            </>
          )}
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default Page;
