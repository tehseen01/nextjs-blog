"use client";

import { TPost } from "@/lib/types";

import { Button, ButtonGroup, User, useDisclosure } from "@nextui-org/react";

import Link from "next/link";

import Image from "next/image";
import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import Comments from "../comments/Comments";

import moment from "moment";
import { useAppSelector } from "@/hooks/reduxHooks";
import DeletePostModal from "./DeletePostModal";

const PostArticle = ({ post }: { post: TPost }) => {
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
                className="w-full h-full object-cover max-h-[350px]"
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
                <Button className="" size="sm">
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
        <div className={articleStyle}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkToc]}
            rehypePlugins={[
              rehypeHighlight,
              rehypeSlug,
              rehypeAutolinkHeadings,
            ]}
          >
            {post.content}
          </ReactMarkdown>
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

export const articleStyle =
  "prose max-w-full prose-h1:mdx-h1 prose-p:mdx-p prose-a:mdx-a prose-h2:mdx-h2 prose-h3:mdx-h3 prose-h4:mdx-h4 prose-h5:mdx-h5 prose-h6:mdx-h6 prose-blockquote:mdx-blockquote prose-img:mdx-img prose-div:mdx-div prose-hr:mdx-hr prose-table:mdx-table prose-tr:mdx-tr prose-th:mdx-th prose-ul:mdx-ul prose-li:mdx-li prose-ol:mdx-ol prose-td:mdx-td prose-pre:mdx-pre prose-code:mdx-code";
