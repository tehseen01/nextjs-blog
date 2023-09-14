"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "../Icon";
import { TPost } from "@/lib/types";

const PostCard = ({ post }: { post: TPost }) => {
  return (
    <article className="mb-2">
      <Card shadow="none" radius="sm" className="border">
        <CardHeader>
          <User
            as={Link}
            href={post.author.username}
            name={post.author.name}
            description={"@" + post.author.username}
            avatarProps={{
              src: `${post.author.avatar}`,
            }}
          />
        </CardHeader>
        <CardBody className="py-0">
          <div className="flex items-center">
            <div className="flex-[2]">
              <h3 className="text-2xl font-bold">
                <Link
                  href={`/${post.author.username}/${post.path}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="pt-2">
                <Button size="sm" variant="light">
                  #Javascript
                </Button>
                <Button size="sm" variant="light">
                  #React.js
                </Button>
                <Button size="sm" variant="light">
                  #Next.js
                </Button>
                <Button size="sm" variant="light">
                  #Typescript
                </Button>
              </div>
            </div>
            {post.image !== null && (
              <figure className="max-md:hidden flex-1 w-full h-full">
                <Image
                  src={post.image}
                  width={200}
                  height={200}
                  alt="about image"
                  className="rounded-md object-cover w-full h-full"
                />
              </figure>
            )}
          </div>
        </CardBody>
        <CardFooter className="justify-between">
          <div className="flex items-center gap-4">
            <div>5 Reacts</div>
            <Button
              className="flex items-center gap-2"
              variant="light"
              as={Link}
              href={`/${post.author.username}/${post.path}#comments`}
            >
              <Icon name="message-circle" strokeWidth={1.25} />
              <span>
                {post._count.comments}{" "}
                <span className="max-sm:hidden">Comments</span>
              </span>
            </Button>
          </div>
          <div>
            <Button variant="light" isIconOnly>
              <Icon name="bookmark" strokeWidth={1.25} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};

export default PostCard;
