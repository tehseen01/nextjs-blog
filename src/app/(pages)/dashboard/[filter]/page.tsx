"use client";

import { TTags, TUser } from "@/lib/types";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const DashboardFilterPage = ({ params }: { params: { filter: string } }) => {
  const { data } = useQuery(["dashboard", params.filter], {
    queryFn: async (): Promise<TUser> => {
      const { data } = await axios.get(`/api/dashboard/${params.filter}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
      {data && params.filter === "followers" ? (
        data.follower.length > 0 ? (
          data.follower.map((follower: TUser) => (
            <Link
              href={`/${follower.username}`}
              className="border p-4 flex items-center flex-col justify-center gap-2 rounded-md bg-default-50"
              key={follower.id}
            >
              <Avatar src={follower.avatar} size="lg" />
              <h2 className="md:text-2xl text-xl font-semibold">
                {follower.name}
              </h2>
              <h3 className="md:font-semibold">@{follower.username}</h3>
            </Link>
          ))
        ) : (
          <Card shadow="none" radius="sm" className="col-span-3 border">
            <CardBody className="flex items-center justify-center md:text-2xl text-xl font-medium">
              You don&apos;t have any follower yet
            </CardBody>
          </Card>
        )
      ) : data && params.filter === "following_users" ? (
        data.following.length > 0 ? (
          data.following.map((following: TUser) => (
            <Link
              href={`/${following.username}`}
              className="border p-4 flex items-center flex-col justify-center gap-2 rounded-md bg-default-50"
              key={following.id}
            >
              <Avatar src={following.avatar} size="lg" />
              <h2 className="md:text-2xl text-xl font-semibold">
                {following.name}
              </h2>
              <h3 className="md:font-semibold">@{following.username}</h3>
            </Link>
          ))
        ) : (
          <Card shadow="none" radius="sm" className="col-span-3 border">
            <CardBody className="flex items-center justify-center md:text-2xl text-xl font-medium">
              You are not following any user
            </CardBody>
          </Card>
        )
      ) : data &&
        params.filter === "following_tags" &&
        data.followingTags.length > 0 ? (
        data.followingTags.map((tag: TTags) => (
          <Card shadow="none" radius="sm" key={tag.id}>
            <CardHeader></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        ))
      ) : (
        <Card shadow="none" radius="sm" className="col-span-3 border">
          <CardBody className="flex items-center justify-center md:text-2xl text-xl font-medium">
            You are not following any tag yet...
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DashboardFilterPage;
