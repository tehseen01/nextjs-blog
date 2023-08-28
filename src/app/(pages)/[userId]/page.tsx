"use client";

import Icon from "@/components/Icon";
import { useAppSelector } from "@/hooks/reduxHooks";
import { TUser } from "@/lib/types";
import { Avatar, Button } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const Page = ({ params }: { params: { userId: string } }) => {
  const { user, authStatus } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useQuery(["user", params.userId], {
    queryFn: async (): Promise<TUser> => {
      const { data } = await axios.get(`/api/users/${params.userId}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center sm:h-[calc(100vh_-_100px)] h-[calc(100dvh_-_100px)]">
        Loading...
      </div>
    );
  }

  return (
    <>
      {data && Object.entries(data).length > 0 && (
        <main className="p-4 md:w-4/5 w-11/12 m-auto">
          <div className="pt-10">
            <header className="w-full border rounded-md p-3">
              <div className="flex items-center justify-center relative">
                <Avatar
                  src={data.avatar}
                  className="absolute -top-10 h-20 w-20"
                  name={data.name}
                />
              </div>
              <div className="flex flex-col justify-end gap-4">
                {authStatus ? (
                  <Button color="primary">Edit Profile</Button>
                ) : (
                  <>
                    <Button color="primary">Follow</Button>
                    <Button isIconOnly>
                      <Icon name="dot" />
                    </Button>
                  </>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <h1 className="lg:text-5xl md:text-4xl text-3xl">
                  {data.name}
                </h1>
              </div>
            </header>
          </div>
        </main>
      )}
    </>
  );
};

export default Page;
