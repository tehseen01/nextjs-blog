import React from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import Icon from "../Icon";

import axios from "axios";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { TCommentReplyOption } from "@/lib/types";

import { useAppSelector } from "@/hooks/reduxHooks";

const CommentOption = ({ data, type, postPath }: TCommentReplyOption) => {
  const { user } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const deleteComment = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/comment?id=${id}`);
      await queryClient.invalidateQueries(["comments", postPath]);
      toast.success(data.message);
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  const deleteReply = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/comment/reply?id=${id}`);
      await queryClient.invalidateQueries(["comments", postPath]);
      await toast.success(data.message);
      console.log(data);
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
    <>
      {user !== null && user.id === data.author.id ? (
        <Dropdown placement="bottom-end" aria-label="Match user">
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
          {type === "comment" ? (
            <>
              <DropdownMenu aria-label="Static Actions comment">
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="report" color="warning">
                  Report abuse
                </DropdownItem>
                <DropdownItem key="edit">Edit comment</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => deleteComment(data.id)}
                >
                  Delete comment
                </DropdownItem>
              </DropdownMenu>
            </>
          ) : (
            <>
              <DropdownMenu aria-label="Static Actions reply">
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="report" color="warning">
                  Report abuse
                </DropdownItem>
                <DropdownItem key="edit">Edit reply</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => deleteReply(data.id)}
                >
                  Delete reply
                </DropdownItem>
              </DropdownMenu>
            </>
          )}
        </Dropdown>
      ) : (
        <Dropdown placement="bottom-end" aria-label="Not match">
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
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="report" color="warning">
              Report abuse
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default CommentOption;
