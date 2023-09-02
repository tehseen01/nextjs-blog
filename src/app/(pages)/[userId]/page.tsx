"use client";

import Icon from "@/components/Icon";
import PostCard from "@/components/posts/PostCard";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { useAppSelector } from "@/hooks/reduxHooks";
import { TUser } from "@/lib/types";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Page = ({ params }: { params: { userId: string } }) => {
  const { moreInfo } = useAppSelector((state) => state.user);

  const { data, isLoading } = useQuery(["user", params.userId], {
    queryFn: async (): Promise<TUser | null> => {
      try {
        const { data } = await axios.get(`/api/users/${params.userId}`);
        return data;
      } catch (error: any) {
        console.log(error);
        if (error.response.data) {
          toast.error(error.response.statusText);
          return null;
        }
        toast.error(error.message);
        return null;
      }
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)]">
        Loading...
      </div>
    );
  }

  return (
    <>
      {data && Object.entries(data).length > 0 && (
        <main className="bg-neutral-100">
          <ProfileDetails user={data} />
          <section className="py-3 grid grid-cols-1 md:grid-cols-[250px_1fr] md:w-[80%] m-auto gap-4">
            <aside>
              <div
                className={clsx(
                  moreInfo ? "max-md:grid" : "max-md:hidden",
                  "bg-white rounded-md p-4 md:grid gap-4 text-neutral-600"
                )}
              >
                <div className="flex items-center gap-4">
                  <span>
                    <Icon strokeWidth={1.25} name="newspaper" />
                  </span>
                  <span>{data.posts.length} posts published</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    <Icon strokeWidth={1.25} name="message-circle" />
                  </span>
                  <span>{data.comment.length} comments written </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    <Icon strokeWidth={1.25} name="hash" />
                  </span>
                  <span> {data.followingTags.length} tags followed</span>
                </div>
              </div>
            </aside>
            <div>
              {data.posts.length > 0 ? (
                data.posts.map((post) => <PostCard post={post} key={post.id} />)
              ) : (
                <div className="p-4 rounded-md bg-white">
                  @{data.username} has not published any post yet!
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Page;
