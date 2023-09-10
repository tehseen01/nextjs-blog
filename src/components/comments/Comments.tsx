"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import { Avatar, Button, useDisclosure } from "@nextui-org/react";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

import { TComment, TPost } from "@/lib/types";

import { useQuery } from "@tanstack/react-query";

import Icon from "../Icon";
import AddComment from "./AddComment";
import AddReply from "./AddReply";
import CommentCard from "./CommentCard";
import AuthModal from "../AuthModal";

const Comments = ({ post }: { post: TPost }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { user } = useAppSelector((state) => state.auth);

  const [openReplyInput, setOpenReplyInput] = useState("");
  const [extentReplies, setExtendReplies] = useState("");

  const comments = useQuery({
    queryKey: ["comments", post.path],
    queryFn: async (): Promise<TComment[]> => {
      try {
        const { data } = await axios.get(`/api/comment?postId=${post.id}`);
        return data;
      } catch (error: any) {
        return [];
      }
    },
    enabled: !!post.id,
  });

  if (comments.isLoading) {
    return <>Loading...</>;
  }

  const handleReplyInput = (commentId: string) => {
    if (user === null) {
      onOpen();
    } else {
      setOpenReplyInput((prev) => (prev === commentId ? "" : commentId));
      setExtendReplies((prev) => (prev === commentId ? "" : ""));
    }
  };

  return (
    <section className="">
      {/* ===COMMENT INPUT BOX=== */}
      <h4 className="text-2xl font-bold pb-6">
        Top Comments: {post._count.comments}
      </h4>
      <AddComment post={post} />
      {/* ===ALL COMMENTS=== */}
      <div className="pt-8">
        {comments.data && comments.data.length > 0
          ? comments.data.map((comment) => (
              <div className="flex md:gap-4 gap-2 pb-6" key={comment.id}>
                <Avatar
                  fallback={comment.author.name}
                  src={comment.author.avatar}
                  as={Link}
                  href={`/${comment.author.username}`}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="flex-1">
                  {/* ===COMMENTS CARD=== */}
                  <CommentCard
                    data={comment}
                    type="comment"
                    postPath={post.path}
                  />
                  <div className="flex items-center pt-2">
                    <Button variant="light" size="sm">
                      <Icon name="heart" strokeWidth={1.25} size={18} /> Likes
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => handleReplyInput(comment.id)}
                    >
                      {" "}
                      <span>Reply</span>
                    </Button>
                  </div>
                  <div>
                    {extentReplies !== comment.id && (
                      <div>
                        {comment._count.replies > 0 && (
                          <Button
                            variant="light"
                            size="sm"
                            className="mr-2 text-primary hover:underline"
                            onClick={() =>
                              setExtendReplies((prev) =>
                                prev === comment.id ? "" : comment.id
                              )
                            }
                          >
                            {comment._count.replies} Replies
                          </Button>
                        )}
                      </div>
                    )}
                    {/* ===REPLY CARD=== */}
                    {extentReplies === comment.id && (
                      <div>
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex md:gap-4 gap-2 py-4"
                          >
                            <Avatar
                              fallback={reply.author.name}
                              src={reply.author.avatar}
                              as={Link}
                              href={`/${reply.author.username}`}
                              className="w-8 h-8 md:w-10 md:h-10"
                            />
                            <div className="flex-1">
                              <CommentCard
                                data={reply}
                                type="reply"
                                postPath={post.path}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* ===REPLY INPUT BOX=== */}
                  {openReplyInput === comment.id && (
                    <AddReply
                      user={user}
                      commentId={comment.id}
                      postPath={post.path}
                    />
                  )}
                </div>
              </div>
            ))
          : null}
      </div>

      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default Comments;
