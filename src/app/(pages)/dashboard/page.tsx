"use client";
import { TDashboard } from "@/lib/types";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

const Dashboard = () => {
  const [activeBtn, setActiveBtn] = useState<
    "posts" | "follower" | "following" | "tag"
  >("posts");

  const { data, isLoading } = useQuery(["dashboard"], {
    queryFn: async (): Promise<TDashboard> => {
      const { data } = await axios.get("/api/dashboard");
      return data;
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {data && Object.entries(data).length > 0 ? (
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <section className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-4">
            <div className="w-full border rounded-md p-6 flex flex-col gap-3">
              <span className="text-3xl font-bold block">0</span>
              <p className="text-default-500">Total post reactions</p>
            </div>
            <div className="w-full border rounded-md p-6 flex flex-col gap-3">
              <span className="text-3xl font-bold block">
                {data.posts.reduce((acu, count) => acu + count.views, 0)}
              </span>
              <p className="text-default-500">Total post views</p>
            </div>
            <div className="w-full border rounded-md p-6 flex flex-col gap-3">
              <span className="text-3xl font-bold block">0</span>
              <p className="text-default-500">Total credits</p>
            </div>
            <div className="w-full border rounded-md p-6 flex flex-col gap-3">
              <span className="text-3xl font-bold block">
                {data._count.comment + data._count.replies}
              </span>
              <p className="text-default-500">Total post comments</p>
            </div>
          </section>
          <section className="flex gap-4">
            <aside className="flex-1 flex flex-col gap-4 max-md:hidden">
              <Button
                variant={activeBtn === "posts" ? "flat" : "light"}
                radius="sm"
                fullWidth
                className="flex justify-between items-center"
                onClick={() => setActiveBtn("posts")}
              >
                <span>Posts</span>
                <span>{data._count.posts}</span>
              </Button>
              <Button
                variant={activeBtn === "follower" ? "flat" : "light"}
                radius="sm"
                fullWidth
                className="flex justify-between items-center"
                onClick={() => setActiveBtn("follower")}
              >
                <span>Followers</span>
                <span>{data._count.follower}</span>
              </Button>
              <Button
                variant={activeBtn === "following" ? "flat" : "light"}
                radius="sm"
                fullWidth
                className="flex justify-between items-center"
                onClick={() => setActiveBtn("following")}
              >
                <span>Following users</span>
                <span>{data._count.following}</span>
              </Button>
              <Button
                variant={activeBtn === "tag" ? "flat" : "light"}
                radius="sm"
                fullWidth
                className="flex justify-between items-center"
                onClick={() => setActiveBtn("tag")}
              >
                <span>Following tags</span>
                <span>{data._count.followingTags}</span>
              </Button>
            </aside>
            <div className="md:flex-[3]">
              <div className="flex justify-between items-center py-4">
                <h3 className="text-2xl font-semibold">Posts</h3>
                <div>hello</div>
              </div>
              <div className="border rounded-md">
                {data.posts.map((post) => (
                  <div
                    key={post.id}
                    className="grid grid-cols-[60%_20%_20%] border-b p-4"
                  >
                    <div>
                      <h2 className="text-xl font-bold">{post.title}</h2>
                      <span>
                        Published at:{" "}
                        {moment(post.createdAt, moment.ISO_8601).format(
                          "MMM DD"
                        )}
                      </span>
                    </div>
                    <div>
                      <span>{post.views}</span>
                    </div>
                    <div className="justify-self-end">
                      <Button size="sm" variant="light">
                        Edit
                      </Button>
                      <Button size="sm" variant="light" color="danger">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Dashboard;
