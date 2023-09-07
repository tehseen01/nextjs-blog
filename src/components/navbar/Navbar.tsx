"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Navbar as NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Icon from "../Icon";

import { useAppSelector } from "@/hooks/reduxHooks";

import Link from "next/link";
import { navLinks } from "./SideNav";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authStatus } = useAppSelector((state) => state.auth);

  return (
    <NavbarContainer
      isBordered
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="basis-0 grow-0">
          <Button
            href={"/"}
            as={Link}
            variant="solid"
            isIconOnly
            aria-label="next-blog home page"
            radius="sm"
            className=" bg-black/90 text-white"
          >
            TEN
          </Button>
        </NavbarBrand>
        {/* ---SEARCH BAR--- */}
        <div className="max-md:hidden">
          <form>
            <Input
              classNames={{
                base: "h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<Icon name="search" />}
              type="search"
            />
          </form>
        </div>
      </NavbarContent>
      {/* ===AUTH USER ACCESS=== */}
      {authStatus ? (
        <NavbarProfile />
      ) : (
        <NavbarContent className="md:gap-4 gap-0" justify="end">
          <NavbarItem className="md:hidden">
            <Button
              as={Link}
              href={"#"}
              variant="light"
              color="default"
              radius="sm"
              isIconOnly
            >
              <Icon name="search" strokeWidth={1.25} />
            </Button>
          </NavbarItem>

          <NavbarItem>
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
          </NavbarItem>
          <NavbarItem>
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
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {navLinks.map((navMenu) => (
          <NavbarMenuItem key={navMenu.id}>
            <Button
              href="/"
              className="justify-start"
              as={Link}
              variant="light"
              fullWidth
            >
              <span>{navMenu.label}</span>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default Navbar;
