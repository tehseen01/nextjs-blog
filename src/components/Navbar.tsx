"use client";

import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <header id="header" className="py-4 border-b">
      <nav className="flex items-center justify-between w-11/12 m-auto ">
        <div className="flex items-center gap-4">
          <div>
            <Button
              href={"/"}
              as={Link}
              variant="solid"
              isIconOnly
              aria-label="next-blog home page"
              radius="sm"
              className=" bg-black/90 text-white"
            >
              NB
            </Button>
          </div>
          <div className="max-md:hidden">
            <form>
              <Input
                placeholder="Search..."
                variant="bordered"
                radius="sm"
                endContent={
                  <div>
                    <Icon name="search" />
                  </div>
                }
              />
            </form>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            href={"/signin"}
            variant="light"
            color="primary"
            radius="sm"
            className="max-md:hidden"
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href={"/signup"}
            variant="ghost"
            radius="sm"
            color="primary"
            className="border-1.5"
            role="link"
          >
            Create account
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
