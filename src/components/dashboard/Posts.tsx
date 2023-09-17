import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import React, { useState } from "react";
import Link from "next/link";

import Icon from "../Icon";
import DeletePostModal from "../posts/DeletePostModal";
import { TDashboard } from "@/lib/types";

import moment from "moment";
import { setFilterPost } from "@/redux/dashboardSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

type TDeletePayloadProp = {
  path: string;
  id: string;
};

const DashboardPosts = ({ dashboardData }: { dashboardData: TDashboard }) => {
  const dispatch = useAppDispatch();

  const [deletePostPayload, setDeletePostPayload] =
    useState<TDeletePayloadProp>({ id: "", path: "" });

  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const handleDelete = (postId: string, postPath: string) => {
    const deletePayload = {
      path: postPath,
      id: postId,
    };
    setDeletePostPayload(deletePayload);
    onOpen();
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFilterPost(value));
  };

  return (
    <>
      {dashboardData.posts.length > 0 ? (
        <div className="">
          <div className="flex justify-between items-center py-4">
            <h3 className="text-2xl font-semibold">Posts</h3>
            <div>
              <Select
                items={PostSort}
                placeholder="Apply Filter"
                aria-label="Sort parent"
                radius="sm"
                fullWidth
                size="sm"
                className="min-w-[200px]"
                defaultSelectedKeys={["recently_created"]}
                onChange={handleChangeSelect}
              >
                {(sort) => (
                  <SelectItem aria-label={sort.label} key={sort.value}>
                    {sort.label}
                  </SelectItem>
                )}
              </Select>
            </div>
          </div>
          <div className="border rounded-md">
            {dashboardData.posts.map((post) => (
              <div
                key={post.id}
                className="grid md:grid-cols-[60%_20%_20%] grid-cols-2 border-b p-4 hover:bg-default-50 items-center"
              >
                <div className="max-md:col-span-2">
                  <h2 className="text-xl font-bold leading-none pb-2 text-primary-600">
                    <Link href={`/${dashboardData.username}/${post.path}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-default-600">
                    <span className="font-bold mr-2">Published:</span>
                    <span>
                      {moment(post.createdAt, moment.ISO_8601).format("MMM DD")}
                    </span>
                  </p>
                </div>
                {post.type === "DRAFT" ? (
                  <Chip radius="sm" color="warning" variant="flat">
                    {post.type}
                  </Chip>
                ) : (
                  <div className="flex gap-2 items-center text-sm">
                    <span className="flex gap-1">
                      <Icon name="heart" strokeWidth={1.25} size={20} />0
                    </span>
                    <span className="flex gap-1">
                      <Icon
                        name="message-circle"
                        strokeWidth={1.25}
                        size={20}
                      />
                      {post._count.comments +
                        post.comments.reduce(
                          (acu, reply) => acu + reply._count.replies,
                          0
                        )}
                    </span>
                    <span className="flex gap-1">
                      <Icon name="eye" strokeWidth={1.25} size={20} />
                      {post.views}
                    </span>
                  </div>
                )}
                <div className="justify-self-end">
                  <Button size="sm" variant="light">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    onClick={() => handleDelete(post.id, post.path)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Card radius="sm" shadow="none" className="border">
          <CardBody className="text-xl font-medium flex justify-center">
            This is where you can manage your posts, but you haven&apos;t
            written anything yet.
          </CardBody>
          <CardFooter className="justify-center">
            <Button radius="sm" color="primary" as={Link} href="/new">
              Write your first post now
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* ===DELETE POST MODAL=== */}
      <DeletePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        post={deletePostPayload}
        type="dashboard"
      />
    </>
  );
};

export default DashboardPosts;

const PostSort = [
  {
    label: "Recently Created",
    value: "recently_created",
  },
  {
    label: "Most Views",
    value: "most_views",
  },
  {
    label: "Most Comments",
    value: "most_comments",
  },
  {
    label: "Most Reactions",
    value: "most_reactions",
  },
  {
    label: "Published",
    value: "PUBLISHED",
  },
  {
    label: "Draft",
    value: "DRAFT",
  },
];
