"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Link,
  Navbar as NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Icon from "./Icon";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import axios from "axios";
import { setAuthStatus } from "@/redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authStatus, user } = useAppSelector((state) => state.auth);

  const logoutHandle = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      console.log(data);
      dispatch(setAuthStatus(false));
    } catch (error) {
      console.log(error);
    }
  };

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
            NB
          </Button>
        </NavbarBrand>
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
      {authStatus ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name}
                src={user?.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{user?.name}</p>
                <p className="font-semibold">@{user?.username}</p>
              </DropdownItem>
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="create_post">Create post</DropdownItem>
              <DropdownItem key="reading_list">Reading list</DropdownItem>
              <DropdownItem key="setting">Setting</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logoutHandle}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent className="gap-4" justify="end">
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
    </NavbarContainer>
  );
};

export default Navbar;
