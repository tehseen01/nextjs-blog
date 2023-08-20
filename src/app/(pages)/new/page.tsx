"use client";

import Editor from "@/components/Editor";
import Icon from "@/components/Icon";
import Preview from "@/components/Preview";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isPreview, setIsPreview] = useState(false);

  return (
    <main className="fixed inset-0 w-full h-full bg-default-100 z-50">
      <Navbar maxWidth="full" className="bg-transparent">
        <NavbarContent className="max-md:hidden">
          <NavbarBrand className="basis-0 grow-0">
            <Button
              href={"/"}
              as={Link}
              variant="solid"
              isIconOnly
              aria-label="home page"
              radius="sm"
              className=" bg-black/90 text-white"
            >
              NB
            </Button>
          </NavbarBrand>
          <NavbarItem className="font-semibold">Create Post</NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="light" onPress={() => setIsPreview(false)}>
              Edit
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="light" onPress={() => setIsPreview(true)}>
              Preview
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="max-md:!grow-0">
          <Button
            isIconOnly
            variant="light"
            color="primary"
            className="text-black"
            onPress={onOpen}
          >
            <Icon name="x" />
          </Button>
        </NavbarContent>
      </Navbar>
      {/* ---EDITOR & PREVIEW--- */}
      {isPreview ? <Preview /> : <Editor />}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>You have unsaved changes</ModalHeader>
              <Divider />
              <ModalBody>
                You&apos;ve made changes to your post. Do you want to navigate
                to leave this page?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  radius="sm"
                  onPress={onClose}
                  as={Link}
                  href="/"
                  className="hover:opacity-100 opacity-80"
                >
                  Yes, Leave the page
                </Button>
                <Button
                  radius="sm"
                  onPress={onClose}
                  className="hover:opacity-100 opacity-80"
                >
                  No, Keep editing
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Page;
