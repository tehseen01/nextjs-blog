"use client";

import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
import Editor from "@/components/posts/Editor";

import { useAppSelector } from "@/hooks/reduxHooks";
import { TPost } from "@/lib/types";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import Link from "next/link";
import React from "react";

const EditPost = ({ params }: { params: { postId: string } }) => {
  const { user, authStatus } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: async (): Promise<TPost> => {
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      return data;
    },
    retry: 1,
  });

  if ((data && data.author.id !== user?.id) || !authStatus) {
    return (
      <div className="flex items-center justify-center flex-col h-[80vh]">
        <div className="inline-flex rounded-full bg-yellow-100 p-4">
          <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold my-6">you are not authorize</h1>
        <Button
          variant="bordered"
          color="primary"
          radius="sm"
          as={Link}
          href="/"
        >
          <Icon name="chevron-left" /> Return Home
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="fixed inset-0 w-full h-full bg-background z-50 ">
      {data && Object.entries(data).length > 0 && <Editor post={data} />}
    </main>
  );
};

export default EditPost;
