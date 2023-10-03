"use client";

import { TPost } from "@/lib/types";

import { Button, ButtonGroup, User, useDisclosure } from "@nextui-org/react";

import Link from "next/link";

import Image from "next/image";
import React from "react";

import Comments from "../comments/Comments";

import Blocks from "editorjs-blocks-react-renderer";
import moment from "moment";
import { useAppSelector } from "@/hooks/reduxHooks";
import DeletePostModal from "./DeletePostModal";
import { useRouter } from "next/navigation";

const PostArticle = ({ post }: { post: TPost }) => {
  const router = useRouter();

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <article className="pb-4">
        <header>
          {post.image !== null && (
            <figure className="w-full max-h-[350px] mb-4">
              <Image
                src={post.image}
                width={400}
                height={200}
                className="w-full h-full object-cover max-h-[350px] md:aspect-[5/2] aspect-[4/2]"
                alt={post.title}
              />
            </figure>
          )}
          <div className="flex justify-between items-center">
            <User
              name={post.author.name}
              as={Link}
              href={`/${post.author.username}`}
              description={
                <div className="text-default-500">
                  Posted on: (
                  {moment(post.createdAt, moment.ISO_8601).format("DD MMM")} ){" "}
                  {moment(
                    post.createdAt,
                    moment.ISO_8601,
                    "DDMMMYYYY"
                  ).fromNow()}
                </div>
              }
              avatarProps={{
                src: `${post.author.avatar}`,
              }}
              className=""
            />
            {user && user.id === post.author.id ? (
              <ButtonGroup radius="sm">
                <Button
                  className=""
                  size="sm"
                  onPress={() =>
                    router.push(`/${post.author.username}/${post.path}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button color="danger" size="sm" onClick={onOpen}>
                  Delete
                </Button>
              </ButtonGroup>
            ) : null}
          </div>
          <h1 className="mb-6 mt-4 scroll-m-20 lg:text-5xl md:text-4xl text-3xl sm:font-extrabold font-bold tracking-tight">
            {post.title}
          </h1>
        </header>
        <div className="prose">
          <Blocks
            data={post.content}
            renderers={{
              checkList: Checklist,
            }}
          />
        </div>
      </article>
      <hr className="pb-8" />
      <Comments post={post} />

      {/* ===DELETE MODAL=== */}
      <DeletePostModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        post={post}
        type="single post"
      />
    </>
  );
};

export default PostArticle;

const Checklist = ({ data, className = "my-2" }: any) => {
  return (
    <>
      {data?.items.map((item: any, i: any) => (
        <p key={i} className={className}>
          <label>
            <input type="checkbox" checked={item.checked} /> {item.text}
          </label>
        </p>
      ))}
    </>
  );
};
