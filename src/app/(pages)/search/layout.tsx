"use client";
import SearchInput from "@/components/search/SearchInput";

import { useAppSelector } from "@/hooks/reduxHooks";
import useQueryString from "@/hooks/useQueryString";

import {
  FILTER_COMMENTS,
  FILTER_MY_POSTS_ONLY,
  FILTER_PEOPLE,
  FILTER_POSTS,
  FILTER_TAGS,
} from "@/utils/constants";

import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("filter");
  const searchQuery = searchParams.get("q");
  const { createQueryString } = useQueryString();

  const { authStatus } = useAppSelector((state) => state.auth);

  return (
    <main className="md:p-6 p-2">
      <div className="max-md:hidden pb-6">
        <h1 className="text-3xl font-bold ">
          Search results for: {searchQuery}
        </h1>
      </div>
      <div className="md:hidden pb-4">
        <SearchInput />
      </div>
      <div className="grid md:grid-cols-[25%_1fr] grid-cols-1 gap-4">
        <aside>
          <ul className="flex md:flex-col gap-3 max-md:flex-nowrap overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter.label}
                variant={
                  !searchFilter && filter.value === "Posts"
                    ? "flat"
                    : searchFilter === filter.value
                    ? "flat"
                    : "light"
                }
                fullWidth
                radius="sm"
                value={filter.value}
                className="md:justify-start"
                onPress={() =>
                  router.push(
                    `${pathname}?${createQueryString("filter", filter.value)}`
                  )
                }
              >
                {filter.label}
              </Button>
            ))}
            {authStatus && (
              <Button
                variant={
                  searchFilter === FILTER_MY_POSTS_ONLY ? "flat" : "light"
                }
                fullWidth
                radius="sm"
                value={FILTER_MY_POSTS_ONLY}
                className="justify-start"
                onPress={() =>
                  router.push(
                    `${pathname}?${createQueryString(
                      "filter",
                      FILTER_MY_POSTS_ONLY
                    )}`
                  )
                }
              >
                My posts only
              </Button>
            )}
          </ul>
        </aside>
        {children}
      </div>
    </main>
  );
};

export default SearchLayout;

const filters = [
  {
    label: "Posts",
    value: FILTER_POSTS,
  },
  {
    label: "People",
    value: FILTER_PEOPLE,
  },
  {
    label: "Tags",
    value: FILTER_TAGS,
  },
  {
    label: "Comments",
    value: FILTER_COMMENTS,
  },
];
