"use client";

import { TPost } from "@/lib/types";
import { User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";

const PostArticle = ({ post }: { post: TPost }) => {
  return (
    <div>
      <article className="">
        <header>
          <User
            name={post.author.name}
            as={Link}
            href={`/${post.author.username}`}
            description={<>Posted on: {post.updatedAt}</>}
            avatarProps={{
              src: `${post.author.avatar}`,
            }}
            className=""
          />
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
    </div>
  );
};

export default PostArticle;

export const articleStyle =
  "prose max-w-full prose-h1:mdx-h1 prose-p:mdx-p prose-a:mdx-a prose-h2:mdx-h2 prose-h3:mdx-h3 prose-h4:mdx-h4 prose-h5:mdx-h5 prose-h6:mdx-h6 prose-blockquote:mdx-blockquote prose-img:mdx-img prose-div:mdx-div prose-hr:mdx-hr prose-table:mdx-table prose-tr:mdx-tr prose-th:mdx-th prose-ul:mdx-ul prose-li:mdx-li prose-ol:mdx-ol prose-td:mdx-td prose-pre:mdx-pre prose-code:mdx-code";
