"use client";

import { Button } from "@nextui-org/react";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import clsx from "clsx";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";

import TextareaAutosize from "react-textarea-autosize";
import { articleStyle } from "./PostArticle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

type TForm = {
  title: string;
  content: string;
  image: Blob | MediaSource;
  postType: "DRAFT" | "PUBLISHED";
};

const Editor = ({ isPreview }: { isPreview: boolean }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TForm>();
  const postType = watch("postType");
  const postTitle = watch("title");
  const postContent = watch("content");

  const [imageFile, setImageFile] = useState<string | null>(null);

  useEffect(() => {
    if (errors.title) {
      toast.error("Title can't be empty!");
    }
  }, [errors.title]);

  const onSubmitHandler: SubmitHandler<TForm> = async (data) => {
    try {
      const res = await axios.post("/api/posts", {
        title: data.title,
        content: data.content,
        image: imageFile,
        type: data.postType,
      });

      toast.success(res.data.message);
      reset();
      setImageFile(null);
      if (data.postType === "DRAFT") {
        router.push(`/dashboard`);
      } else {
        router.push(
          `/${res.data.newPost.author.username}/${res.data.newPost.path}`
        );
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const Reader = new FileReader();

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setImageFile(Reader.result as string);
        }
      };
      if (file) {
        Reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form
      className="md:w-5/6 w-full mx-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="md:h-[calc(100vh_-_140px)] h-[calc(100dvh_-_140px)] overflow-y-auto bg-white rounded-md border">
        {isPreview ? (
          <article className={clsx("prose py-4 px-8 max-w-full", articleStyle)}>
            {/* ---PREVIEW--- */}
            {imageFile && (
              <figure className="w-full max-h-[350px] mb-4">
                <Image
                  src={imageFile}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover max-h-[350px]"
                  alt={postTitle}
                />
              </figure>
            )}
            <h1>{postTitle}</h1>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkToc]}
              rehypePlugins={[
                rehypeHighlight,
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeRaw,
              ]}
            >
              {postContent}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="h-full">
            <div className="py-4 px-8">
              <div className="flex gap-8 ">
                <input
                  type="file"
                  {...register("image")}
                  onChange={handleImage}
                />
                {imageFile && (
                  <figure className="relative">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="absolute -top-4 -right-4 text-red-500 "
                      onClick={() => {
                        setImageFile(null), resetField("image");
                      }}
                    >
                      <Icon name="x" />
                    </Button>
                    <Image
                      src={imageFile}
                      width={100}
                      height={100}
                      alt="post image"
                    />
                  </figure>
                )}
              </div>
              <TextareaAutosize
                {...register("title", { required: true })}
                aria-label="Post Title"
                placeholder="New post title here..."
                className="lg:text-5xl md:text-4xl text-3xl leading-tight resize-none w-full md:font-extrabold font-bold outline-none placeholder:text-slate-900"
              />
            </div>
            <div className="bg-gray-100 py-4 px-8 h-16">
              Buttons in progress...
            </div>
            <div className="py-4 px-8">
              <TextareaAutosize
                aria-label="Post content"
                {...register("content")}
                placeholder="Write your post content here..."
                className="resize-none w-full outline-none overflow-hidden font-mono text-lg"
              />
            </div>
          </div>
        )}
      </div>
      <div className="pt-4 flex items-center gap-4 px-8">
        <Button
          color="primary"
          radius="sm"
          type="submit"
          isDisabled={postType === "PUBLISHED" && isSubmitting ? true : false}
          isLoading={postType === "PUBLISHED" && isSubmitting ? true : false}
          onClick={() => setValue("postType", "PUBLISHED")}
        >
          {postType === "PUBLISHED" && isSubmitting
            ? "publishing..."
            : "Publish"}
        </Button>
        <Button
          variant="light"
          color="primary"
          radius="sm"
          type="submit"
          isDisabled={postType === "DRAFT" && isSubmitting ? true : false}
          isLoading={postType === "DRAFT" && isSubmitting ? true : false}
          onClick={() => setValue("postType", "DRAFT")}
        >
          {postType === "DRAFT" && isSubmitting ? "Saving..." : "Save Draft"}
        </Button>
      </div>
    </form>
  );
};

export default Editor;
