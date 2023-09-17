"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { Button, Select, SelectItem } from "@nextui-org/react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const DashboardFilter = () => {
  const router = useRouter();
  const params = useParams();

  const { dashboardData } = useAppSelector((state) => state.dashboard);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value);
  };

  return (
    <>
      <aside className="flex-1 flex flex-col gap-4 max-md:hidden">
        <Button
          as={Link}
          href="/dashboard"
          variant={!params.filter ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Posts</span>
          <span>{dashboardData && dashboardData._count.posts}</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/followers"
          variant={params.filter === "followers" ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Followers</span>
          <span>{dashboardData && dashboardData._count.follower}</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/following_users"
          variant={params.filter === "following_users" ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Following users</span>
          <span>{dashboardData && dashboardData._count.following}</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/following_tags"
          variant={params.filter === "following_tags" ? "flat" : "light"}
          radius="sm"
          fullWidth
          className="flex justify-between items-center"
        >
          <span>Following tags</span>
          <span>{dashboardData && dashboardData._count.followingTags}</span>
        </Button>
      </aside>
      <div className="md:hidden">
        <Select
          items={FilterLinks}
          placeholder="Apply Filter"
          aria-label="Sort parent"
          radius="sm"
          fullWidth
          size="sm"
          className="min-w-[200px]"
          selectedKeys={
            params.filter === "followers"
              ? ["/dashboard/followers"]
              : params.filter === "following_users"
              ? ["/dashboard/following_users"]
              : params.filter === "following_tags"
              ? ["/dashboard/following_tags"]
              : ["/dashboard"]
          }
          defaultSelectedKeys={["/dashboard"]}
          onChange={handleSelectionChange}
        >
          {(sort) => (
            <SelectItem aria-label={sort.label} key={sort.path}>
              {sort.label}
            </SelectItem>
          )}
        </Select>
      </div>
    </>
  );
};

export default DashboardFilter;

const FilterLinks = [
  {
    label: "Posts",
    path: "/dashboard",
  },
  {
    label: "Followers",
    path: "/dashboard/followers",
  },
  {
    label: "Following Users",
    path: "/dashboard/following_users",
  },
  {
    label: "Following Tags",
    path: "/dashboard/following_tags",
  },
];
