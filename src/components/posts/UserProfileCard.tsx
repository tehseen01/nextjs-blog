"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import { TPost, TUser } from "@/lib/types";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

import toast from "react-hot-toast";

import AuthModal from "../AuthModal";
import { useQueryClient } from "@tanstack/react-query";

const UserProfileCard = ({ post }: { post: TPost }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isFollowed, setIsFollowed] = useState(false);

  const { user, authStatus } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const handleFollow = async () => {
    try {
      if (authStatus) {
        const { data } = await axios.post(`/api/users/follow`, {
          userId: post.author.id,
        });
        console.log(data);
        queryClient.invalidateQueries(["posts", post.path]);
        toast.success(data.message);
      } else {
        onOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="border" shadow="none" radius="sm">
        <CardHeader className="justify-between">
          <Link href={`/${post.author.username}`} className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={post.author.avatar}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="font-semibold leading-none text-default-800">
                {post.author.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                @{post.author.username}
              </h5>
            </div>
          </Link>
          {user && user?.id === post.author.id ? (
            <></>
          ) : (
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="sm"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={handleFollow}
            >
              {user && post.author.followerIDs.includes(user.id)
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-500 overflow-hidden">
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
          <span className="pt-2">
            #FrontendWithZoey
            <span className="py-2" aria-label="computer" role="img">
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {post.author.followingIDs.length}
            </p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {post.author.followerIDs.length}
            </p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>

      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default UserProfileCard;
