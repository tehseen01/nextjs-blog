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

const PostCard = () => {
  return (
    <article className="mb-2">
      <Card shadow="none" radius="sm" className="border">
        <CardHeader>
          <User
            as={Link}
            href={"/"}
            name="Jane Doe"
            description="Product Designer"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
          />
        </CardHeader>
        <CardBody className="py-0">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              vitae!
            </h3>
            <figure className="max-md:hidden">
              <Image
                src={"/12.jpg"}
                width={200}
                height={200}
                alt="about image"
                className="rounded-md"
              />
            </figure>
          </div>
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
        </CardBody>
        <CardFooter className="justify-between">
          <div className="flex items-center gap-4">
            <div>5 Reacts</div>
            <div className="flex items-center gap-2">
              <Icon name="message-circle" strokeWidth={1.25} />
              <span>
                2 <span className="max-sm:hidden">Comments</span>
              </span>
            </div>
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
