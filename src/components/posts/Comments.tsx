"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import moment from "moment";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

const Comments = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (textareaRef.current?.focus) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, []);

  return (
    <section className="">
      {/* ===COMMENT INPUT BOX=== */}
      <div>
        <h4 className="text-2xl font-bold pb-6">Top Comments</h4>
        {user && Object.entries(user).length > 0 ? (
          <div className="flex gap-4">
            <Avatar
              src={user?.avatar}
              fallback={user?.name}
              alt={user?.username}
              as={Link}
              href={`/${user.username}`}
              size="md"
            />
            <div className="flex-1 ">
              <Textarea
                name="comment"
                id="comment"
                variant="bordered"
                placeholder="Add to the discussion"
                className="text-base font-mono"
                size="lg"
                radius="sm"
                ref={textareaRef}
              />
              <div>{isFocused ? <Button>Submit</Button> : null}</div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Avatar fallback={"TEN"} size="md" />
            <Textarea
              isReadOnly
              variant="bordered"
              placeholder="Add to the discussion"
              className="flex-1"
              radius="sm"
              onClick={onOpen}
            />
          </div>
        )}
      </div>
      {/* ===ALL COMMENTS=== */}
      <div className="pt-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex gap-4 pb-6" key={index}>
            <Avatar fallback={"TEN"} size="md" />
            <div className="flex-1">
              <Card radius="sm" className=" border" shadow="none">
                <CardHeader className="justify-between">
                  <div className="flex items-center">
                    <h5 className="font-bold">Username</h5> <Icon name="dot" />
                    <span className="text-sm">{moment().format("Do MMM")}</span>
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="opacity-50 hover:opacity-100"
                  >
                    <Icon name="more-horizontal" size={20} />
                  </Button>
                </CardHeader>
                <CardBody className="pt-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid odit suscipit ratione?
                </CardBody>
              </Card>
              <div className="flex items-center pt-2">
                <Button variant="light" size="sm">
                  <Icon name="heart" strokeWidth={1.25} size={18} /> Likes
                </Button>
                <Button variant="light" size="sm">
                  <Icon name="message-circle" strokeWidth={1.25} size={18} />{" "}
                  <span>Reply</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Log in to continue
              </ModalHeader>
              <ModalBody>
                <p>
                  We&apos;re a place where coders share, stay up-to-date and
                  grow their careers.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="bordered"
                  fullWidth
                  onPress={onClose}
                  radius="sm"
                  as={Link}
                  href="/signin"
                >
                  Log in
                </Button>
                <Button
                  color="primary"
                  fullWidth
                  onPress={onClose}
                  radius="sm"
                  as={Link}
                  href="/signup"
                >
                  Create account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Comments;
