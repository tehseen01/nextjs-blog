"use client";

import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import Icon from "../Icon";
import Link from "next/link";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setAuthStatus } from "@/redux/authSlice";

const NavbarProfile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

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
    <>
      <NavbarContent as="div" justify="end">
        <NavbarItem className="group">
          <Button
            as={Link}
            href={"/new"}
            variant="ghost"
            color="primary"
            className="border-1.5 group-hover:underline"
            radius="sm"
          >
            Write Post
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href={"/"} isIconOnly variant="light">
            <Icon name="bell" strokeWidth={1.25} className="hover:fill-black" />
          </Button>
        </NavbarItem>
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
            <DropdownSection aria-label="Profile" showDivider>
              <DropdownItem
                key="profile"
                className="h-14 gap-2 group"
                textValue={user?.username}
              >
                <Link
                  className="group-hover:underline"
                  href={user ? `/${user.username}` : "/"}
                >
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-gray-400">@{user?.username}</p>
                </Link>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="Profile Links" showDivider>
              {profileLinks.map((dropdown) => (
                <DropdownItem
                  textValue={dropdown.label}
                  key={dropdown.id}
                  className="group"
                  color="primary"
                >
                  <Link
                    href={`${dropdown.path}`}
                    className="group-hover:underline"
                  >
                    {dropdown.label}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={onOpen}
              textValue="log out"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* ===SIGN OUT MODEL=== */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Are you sure you want to log out?</ModalHeader>
              <Divider />
              <ModalFooter>
                <Button
                  color="danger"
                  radius="sm"
                  onPress={logoutHandle}
                  as={Link}
                  href="/"
                  className="hover:opacity-100 opacity-80"
                >
                  Log out
                </Button>
                <Button
                  radius="sm"
                  onPress={onClose}
                  className="hover:opacity-100 opacity-80"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarProfile;

const profileLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "create_post",
    label: "Create post",
    path: "/new",
  },
  {
    id: "reading_list",
    label: "Reading List",
    path: "/reading_list",
  },
  {
    id: "setting",
    label: "Setting",
    path: "/setting",
  },
];
