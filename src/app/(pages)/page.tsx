"use client";

import RightAside from "@/components/RightAside";
import SideNav from "@/components/navbar/SideNav";
import PostCard from "@/components/posts/PostCard";
import { TPost } from "@/lib/types";
import { Button, Skeleton } from "@nextui-org/react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setProgress } from "@/redux/commonSlice";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

type PostWithTotalPage = {
  posts: TPost[];
  totalPages: number;
  currentPage: number;
};

export default function Home() {
  const { ref, inView } = useInView();

  const dispatch = useAppDispatch();

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam = 1 }): Promise<PostWithTotalPage> => {
        const { data } = await axios.get("/api/posts?page=" + pageParam);
        return data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined;
      },
      onSuccess: () => {
        dispatch(setProgress(100));
      },
      refetchOnWindowFocus: false,
    });

  if (isLoading) {
    dispatch(setProgress(80));
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
          {/* ===POST CARD SKELETON=== */}
          {isLoading && (
            <div className="w-full">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="p-2 mb-4 border rounded-md grid md:grid-cols-[1fr_200px] grid-cols-1 md:gap-8 gap-4"
                  key={index}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <div>
                        <Skeleton className="w-12 h-12 rounded-full" />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <Skeleton className="w-10/12 h-4 rounded-md" />
                        <Skeleton className="w-full h-4 rounded-md" />
                      </div>
                    </div>
                    <div className="pt-6 flex flex-col gap-2">
                      <Skeleton className="rounded-md w-[85%] h-4" />
                      <Skeleton className="rounded-md w-full h-4" />
                      <Skeleton className="rounded-md w-[80%] h-4" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-4">
                      <Skeleton className="rounded-md w-full h-6" />
                      <Skeleton className="rounded-md w-full h-6" />
                      <Skeleton className="rounded-md w-full h-6" />
                      <Skeleton className="rounded-md w-full h-6" />
                    </div>
                  </div>
                  <div className="max-md:hidden">
                    <Skeleton className="rounded-md w-full h-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* ===POST CARD CONTENT=== */}
          {data && data.pages.length > 0 ? (
            data.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.posts.map((blogPost) => (
                  <PostCard key={blogPost.id} post={blogPost} />
                ))}
              </React.Fragment>
            ))
          ) : (
            <div>Something went wrong please refresh the page!</div>
          )}
          <div className="py-4 flex items-center justify-center">
            {hasNextPage ? (
              <Button
                ref={ref}
                isDisabled={!hasNextPage}
                isLoading
                variant="light"
              >
                Loading more
              </Button>
            ) : (
              <div>No more posts!</div>
            )}
          </div>
        </main>
        <RightAside />
      </div>
    </div>
  );
}
