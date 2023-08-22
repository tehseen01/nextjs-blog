import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setPostContent, setPostTitle } from "@/redux/editorSlice";

import { Button } from "@nextui-org/react";

import React, { useEffect } from "react";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

type TForm = {
  title: string;
  content: string;
};

const Editor = ({ isPreview }: { isPreview: boolean }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<TForm>();

  const dispatch = useAppDispatch();
  const { postContent, postTitle } = useAppSelector((state) => state.editor);

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setPostTitle(e.target.value));
    const scrollHeight = e.currentTarget.scrollHeight;
    document.documentElement.style.setProperty(
      "--editor-title-h",
      `${scrollHeight}px`
    );
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setPostContent(e.target.value));
    const scrollHeight = e.currentTarget.scrollHeight;
    document.documentElement.style.setProperty(
      "--editor-content-h",
      `${scrollHeight}px`
    );
  };

  useEffect(() => {
    if (errors.title) {
      toast.error("Title can't be empty!");
    }
  }, [errors.title]);

  const onSubmitHandler: SubmitHandler<TForm> = async (data) => {
    try {
      const res = await axios.post("/api/posts", data);

      toast.success(res.data.message);
      reset();

      console.log(res.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  return (
    <form
      className="md:w-5/6 w-full mx-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="md:h-[calc(100vh_-_140px)] h-[calc(100dvh_-_140px)] overflow-y-auto bg-white rounded-md border">
        {isPreview ? (
          <article className="prose py-4 px-8 max-w-full">
            {/* ---PREVIEW--- */}
            <h1>{postTitle}</h1>
            <ReactMarkdown>{postContent}</ReactMarkdown>
          </article>
        ) : (
          <div className="h-full">
            <div className="py-4 px-8">
              <textarea
                {...register("title", { required: true })}
                aria-label="Post Title"
                placeholder="New post title here..."
                className="lg:text-5xl md:text-4xl text-3xl leading-tight resize-none w-full md:font-extrabold font-bold outline-none placeholder:text-slate-900"
                value={postTitle}
                style={{ minHeight: `var(--editor-title-h)` }}
                onChange={handleTitle}
              />
            </div>
            <div className="bg-gray-100 py-4 px-8 h-16">
              Buttons in progress...
            </div>
            <div className="py-4 px-8">
              <textarea
                aria-label="Post content"
                {...register("content")}
                placeholder="Write your post content here..."
                className="resize-none w-full outline-none overflow-hidden font-mono text-lg"
                style={{ minHeight: `var(--editor-content-h)` }}
                value={postContent}
                onChange={handleContent}
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
          isDisabled={isSubmitting ? true : false}
          isLoading={isSubmitting ? true : false}
        >
          {isSubmitting ? "publishing..." : "Publish"}
        </Button>
        <Button variant="light" color="primary" radius="sm">
          Save Draft
        </Button>
      </div>
    </form>
  );
};

export default Editor;
