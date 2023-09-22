"use client";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/hooks/reduxHooks";
import { TTags } from "@/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

type TCardData = {
  id: string;
  color: string;
};

const TagsPage = () => {
  const [hoverCardData, setHoverCardData] = useState<TCardData | null>(null);

  const { authStatus } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useQuery(["tags"], {
    queryFn: async (): Promise<TTags[]> => {
      const { data } = await axios.get("/api/tags");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="pb-4">
      <header className="flex justify-between px-6 py-4 max-md:flex-col ">
        <div className="max-md:flex justify-between max-md:mb-4">
          <h1 className="md:text-3xl md:font-bold text-2xl font-semibold">
            Tags
          </h1>
          {authStatus && (
            <Button
              as={Link}
              variant="light"
              color="secondary"
              href={"/dashboard/following_tags"}
              className="md:hidden"
            >
              following tags
            </Button>
          )}
        </div>
        <ul className="flex items-center gap-4">
          {authStatus && (
            <li className="max-md:hidden">
              <Button
                as={Link}
                variant="light"
                color="secondary"
                href={"/dashboard/following_tags"}
              >
                following tags
              </Button>
            </li>
          )}
          <li className="max-md:w-full">
            <Input
              fullWidth
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<Icon name="search" size={18} />}
              type="search"
            />
          </li>
        </ul>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {data && data.length > 0
          ? data.map((tag) => (
              <Card
                radius="sm"
                shadow="none"
                className="border"
                key={tag.id}
                style={{ borderColor: `${tag.color}50` }}
              >
                <CardHeader className="justify-between">
                  <Chip
                    radius="sm"
                    as={Link}
                    href={"/"}
                    variant="light"
                    size="sm"
                    className="font-bold text-base border border-transparent"
                    onMouseEnter={() => setHoverCardData(tag)}
                    onMouseLeave={() => setHoverCardData(null)}
                    style={{
                      backgroundColor:
                        tag.id === hoverCardData?.id
                          ? `${hoverCardData.color}30`
                          : "",
                      borderColor:
                        tag.id === hoverCardData?.id
                          ? `${hoverCardData.color}`
                          : "",
                    }}
                  >
                    {tag.label}
                  </Chip>
                  <span>123 Posts</span>
                </CardHeader>
                <CardBody className="py-1">
                  <p>{tag.description}</p>
                </CardBody>
                <CardFooter>
                  <Button radius="sm" color="primary">
                    Follow
                  </Button>
                </CardFooter>
              </Card>
            ))
          : null}
      </div>
    </main>
  );
};

export default TagsPage;
