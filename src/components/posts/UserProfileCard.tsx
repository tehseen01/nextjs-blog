"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const UserProfileCard = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div>
      <Card className="border" shadow="none" radius="sm">
        <CardHeader className="justify-between">
          <Link href={"/"} className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="font-semibold leading-none text-default-800">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                @zoeylang
              </h5>
            </div>
          </Link>
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
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
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
        <CardFooter className="flex-col items-start">
          <div className="">
            <p className="font-semibold text-default-800">Education</p>
            <p className=" text-default-500 text-small">Following</p>
          </div>
          <div className="">
            <p className="font-semibold text-default-800">Joined</p>
            <p className=" text-default-500 text-small">02-09-2023</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfileCard;
