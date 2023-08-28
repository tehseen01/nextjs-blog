"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { TUser } from "@/lib/types";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserProfileCard = ({ user }: { user: TUser }) => {
  const router = useRouter();

  const [isFollowed, setIsFollowed] = useState(false);

  const currentUser = useAppSelector((state) => state.auth);

  const handleFollow = async () => {
    try {
      if (currentUser.authStatus) {
        const { data } = await axios.post(`/api/users/follow`, {
          userId: user.id,
        });
        console.log(data);
        toast.success(data.message);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="border" shadow="none" radius="sm">
        <CardHeader className="justify-between">
          <Link href={`/${user.username}`} className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={user.avatar} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="font-semibold leading-none text-default-800">
                {user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                @{user.username}
              </h5>
            </div>
          </Link>
          {currentUser.user && currentUser.user?.id === user.id ? (
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
              {isFollowed ? "Unfollow" : "Follow"}
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
              {user.followingIDs.length}
            </p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {user.followerIDs.length}
            </p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfileCard;
