"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import moment from "moment";

import Link from "next/link";
import React, { useState } from "react";
import Icon from "../Icon";
import { TPost } from "@/lib/types";
import AddComment from "./AddComment";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const Comments = ({ post }: { post: TPost }) => {
  const { user } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const deleteComment = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/comment?id=${id}`);
      toast.success(data.message);
      queryClient.invalidateQueries(["posts", post.path]);
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  return (
    <section className="">
      {/* ===COMMENT INPUT BOX=== */}
      <AddComment post={post} />
      {/* ===ALL COMMENTS=== */}
      <div className="pt-8">
        {post.comments.length > 0
          ? post.comments.map((comment) => (
              <div className="flex md:gap-4 gap-2 pb-6" key={comment.id}>
                <Avatar
                  fallback={comment.author.name}
                  src={comment.author.avatar}
                  as={Link}
                  href={`/${comment.author.username}`}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="flex-1">
                  <Card radius="sm" className=" border" shadow="none">
                    <CardHeader className="justify-between">
                      <div className="flex items-center">
                        <h5 className="font-semibold">
                          {comment.author.username}
                        </h5>{" "}
                        <Icon name="dot" strokeWidth={1.25} />
                        <span className="text-sm">
                          {moment(comment.updatedAt, moment.ISO_8601).format(
                            "Do MMM"
                          )}
                        </span>
                      </div>
                      {/* ===DROPDOWN FOR MORE OPTION IN COMMENT=== */}
                      {user !== null && user.id === comment.author.id ? (
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              className="opacity-50 hover:opacity-100"
                            >
                              <Icon name="more-horizontal" size={20} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">New file</DropdownItem>
                            <DropdownItem key="copy">Copy link</DropdownItem>
                            <DropdownItem key="edit">Edit file</DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() => deleteComment(comment.id)}
                            >
                              Delete comment
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          className="opacity-50 hover:opacity-100"
                        >
                          <Icon name="more-horizontal" size={20} />
                        </Button>
                      )}
                    </CardHeader>
                    <CardBody className="pt-0">{comment.content}</CardBody>
                  </Card>
                  <div className="flex items-center pt-2">
                    <Button variant="light" size="sm">
                      <Icon name="heart" strokeWidth={1.25} size={18} /> Likes
                    </Button>
                    <Button variant="light" size="sm">
                      <Icon
                        name="message-circle"
                        strokeWidth={1.25}
                        size={18}
                      />{" "}
                      <span>Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default Comments;
