"use client";

import SearchNotMatch from "@/components/search/SearchNotMatch";
import PostCard from "@/components/posts/PostCard";
import { TComment, TPost, TTags, TUser } from "@/lib/types";
import {
  FILTER_COMMENTS,
  FILTER_MY_POSTS_ONLY,
  FILTER_PEOPLE,
  FILTER_POSTS,
  FILTER_TAGS,
} from "@/utils/constants";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import SearchPostLoop from "@/components/search/SearchPostLoop";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const params = useSearchParams();
  const query = params.get("q");
  const filter = params.get("filter");

  const fetchSearchData = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  };

  const defaultData = useQuery(["search"], {
    queryFn: () => fetchSearchData(`/api/search`),
    refetchOnWindowFocus: false,
  });

  const searchResultQuery = useQuery(["search", query], {
    queryFn: () => fetchSearchData(`/api/search?q=${query}`),
    refetchOnWindowFocus: false,
    enabled: !!query,
  });

  const searchResultWithFilterQuery = useQuery(["search", filter, query], {
    queryFn: () => fetchSearchData(`/api/search?q=${query}&filter=${filter}`),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {!filter && !query ? (
        <>
          {defaultData.data &&
            defaultData.data.length > 0 &&
            defaultData.data.map((post: TPost) => (
              <PostCard key={post.id} post={post} />
            ))}
        </>
      ) : (!filter && query) || (query && filter === FILTER_POSTS) ? (
        <>
          <SearchPostLoop searchPost={searchResultQuery.data} />
        </>
      ) : query && filter === FILTER_PEOPLE ? (
        <div className="flex flex-col gap-4">
          {searchResultWithFilterQuery.data &&
          searchResultWithFilterQuery.data.length > 0 ? (
            searchResultWithFilterQuery.data.map((user: TUser) => (
              <Card key={user.id} shadow="none" radius="sm" className="border">
                <CardHeader
                  className="gap-4"
                  as={Link}
                  href={`/${user.username}`}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    fallback={user.name}
                  />{" "}
                  <h2 className="font-semibold">{user.username}</h2>
                </CardHeader>
                <CardBody className="py-1">
                  <Link
                    href={`/${user.username}`}
                    className="text-2xl font-bold"
                  >
                    {user.name}
                  </Link>
                </CardBody>
                <CardFooter className="justify-end">
                  <Button radius="sm">Follow</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <SearchNotMatch />
          )}
        </div>
      ) : query && filter === FILTER_COMMENTS ? (
        <>
          {searchResultWithFilterQuery.data &&
          searchResultWithFilterQuery.data.length > 0 ? (
            searchResultWithFilterQuery.data.map((comment: TComment) => (
              <PostCard post={comment.post} key={comment.id} />
            ))
          ) : (
            <SearchNotMatch />
          )}
        </>
      ) : query && filter === FILTER_TAGS ? (
        <div className="flex flex-col gap-4">
          {searchResultWithFilterQuery.data &&
          searchResultWithFilterQuery.data.length > 0 ? (
            searchResultWithFilterQuery.data.map((tag: TTags) => (
              <Card key={tag.id} shadow="none" radius="sm" className="border">
                <CardBody className="gap-4 flex-row">
                  <span
                    className="p-2 rounded-md text-2xl font-bold w-10 h-10 flex items-center justify-center"
                    style={{
                      backgroundColor: `${tag.color}30`,
                      color: tag.color,
                    }}
                  >
                    #
                  </span>
                  <div>
                    <Link
                      href={"#"}
                      className="text-xl font-bold hover:underline hover:text-primary-600"
                    >
                      {tag.value}
                    </Link>
                    <p>{tag.description}</p>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <SearchNotMatch />
          )}
        </div>
      ) : query && filter === FILTER_MY_POSTS_ONLY ? (
        <>
          <SearchPostLoop searchPost={searchResultWithFilterQuery.data} />
        </>
      ) : (
        <SearchNotMatch />
      )}
    </div>
  );
};

export default SearchPage;
