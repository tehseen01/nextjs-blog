"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import React from "react";
import Icon from "./Icon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TSavedPost } from "@/lib/types";
import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";

const RightAside = () => {
  const { authStatus } = useAppSelector((state) => state.auth);

  const { data } = useQuery(["posts", "saved"], {
    queryFn: async (): Promise<TSavedPost[]> => {
      const { data } = await axios.get("/api/posts/saved");
      return data;
    },
  });

  return (
    <aside className=" max-lg:hidden">
      {!authStatus ? (
        <div>
          <Card shadow="none" radius="sm" className="border">
            <CardHeader className="text-2xl font-bold">
              TEN Community is a community of amazing developers
            </CardHeader>
            <CardBody>
              We&apos;re a place where coders share, stay up-to-date and grow
              their careers.
            </CardBody>
            <CardFooter className="flex-col gap-4">
              <Button
                as={Link}
                href="/signup"
                variant="ghost"
                color="primary"
                radius="sm"
                fullWidth
              >
                Create account
              </Button>
              <Button
                as={Link}
                href="/signin"
                variant="light"
                radius="sm"
                fullWidth
              >
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-medium pb-4 pt-1">My reading list</h4>
          <div>
            {data &&
              data.length > 0 &&
              data.map((saved) => (
                <Card
                  key={saved.id}
                  radius="sm"
                  shadow="none"
                  className="border mb-2 p-2"
                >
                  <CardBody className="p-2">
                    <div className="flex">
                      <Link
                        className="font-semibold break-all hover:text-primary-600"
                        href={`/${saved.post.author.username}/${saved.post.path}`}
                      >
                        {saved.post.title}
                      </Link>
                    </div>
                  </CardBody>
                  <CardFooter className="p-2 flex justify-between">
                    <User
                      name={saved.post.author.name}
                      description={"@" + saved.post.author.username}
                      avatarProps={{
                        src: saved.post.author.avatar,
                      }}
                      as={Link}
                      href={`/${saved.post.author.username}`}
                    />
                    <div>
                      <Button isIconOnly variant="light">
                        <Icon name="bookmark" strokeWidth={1.25} fill="black" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}

      <Card shadow="none" className="pt-4">
        <CardHeader>
          TEN blog A constructive and inclusive social network for software
          developers. With you every step of your journey.
        </CardHeader>
        <CardBody>
          Built using Nextjs, typescript, prisma, mongoDB, tailwindCSS, NextUI
          and editorjs .
        </CardBody>
        <CardFooter>Made with love and Nextjs. TEN blog © 2023.</CardFooter>
      </Card>
    </aside>
  );
};

export default RightAside;
