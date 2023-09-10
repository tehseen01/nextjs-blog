import { Card, CardBody, CardHeader } from "@nextui-org/react";

import React from "react";

import clsx from "clsx";
import moment from "moment";

import { TCommentReplyOption } from "@/lib/types";

import Icon from "../Icon";
import CommentOption from "./CommentOption";

import { useAppSelector } from "@/hooks/reduxHooks";

const CommentCard = ({ data, type, postPath }: TCommentReplyOption) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Card
      radius="sm"
      className={clsx(
        data.author.id === user?.id ? "border-default-400" : "",
        " border"
      )}
      shadow="none"
    >
      <CardHeader className="justify-between">
        <div className="flex items-center">
          <h5 className="font-semibold">{data.author.username}</h5>{" "}
          <Icon name="dot" strokeWidth={1.25} />
          <span className="text-sm">
            {moment(data.updatedAt, moment.ISO_8601).format("Do MMM")}
          </span>
        </div>
        {/* ===DROPDOWN FOR MORE OPTION IN COMMENT=== */}
        {type === "comment" ? (
          <CommentOption data={data} type="comment" postPath={postPath} />
        ) : (
          <CommentOption data={data} type="reply" postPath={postPath} />
        )}
      </CardHeader>
      <CardBody className="pt-0">{data.content}</CardBody>
    </Card>
  );
};

export default CommentCard;
