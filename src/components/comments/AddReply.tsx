"use client";

import { TUser } from "@/lib/types";

import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import Link from "next/link";
import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type TReplyFormState = {
  reply: string;
};

type TAddReplyProp = {
  user: TUser | null;
  commentId: string;
  postPath: string;
};

const AddReply = ({ user, commentId, postPath }: TAddReplyProp) => {
  const {
    register,
    reset,
    formState: { isDirty, isSubmitting, isValid },
    handleSubmit,
  } = useForm<TReplyFormState>();

  const queryClient = useQueryClient();

  const onSubmitReply: SubmitHandler<TReplyFormState> = async (data) => {
    try {
      const res = await axios.post("/api/comment/reply", {
        replyText: data.reply,
        commentId: commentId,
      });
      queryClient.invalidateQueries(["comments", postPath]);
      toast.success(res.data.message);
      console.log(res.data);
      reset();
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.statusText);
      }
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4 py-2">
      <Avatar
        fallback={user?.name}
        src={user?.avatar}
        as={Link}
        href={`/${user?.username}`}
        className="w-8 h-8 md:w-10 md:h-10"
      />
      <form className="flex-1" onSubmit={handleSubmit(onSubmitReply)}>
        <Textarea
          {...register("reply", { required: true })}
          placeholder="Type your reply..."
          className=""
        />
        <Button
          className="mt-3"
          radius="sm"
          color="primary"
          type="submit"
          isLoading={isSubmitting ? true : false}
          isDisabled={!isDirty || isSubmitting || !isValid}
        >
          {isSubmitting ? "Replying" : "Reply"}
        </Button>
      </form>
    </div>
  );
};

export default AddReply;
