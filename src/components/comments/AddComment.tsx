"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import { TPost } from "@/lib/types";
import { Avatar, Button, Textarea, useDisclosure } from "@nextui-org/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import toast from "react-hot-toast";

import Link from "next/link";
import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import AuthModal from "../AuthModal";

type TFormState = {
  comment: string;
};

const AddComment = ({ post }: { post: TPost }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<TFormState>();

  const [isFocused, setIsFocused] = useState(false);

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<TFormState> = async (data) => {
    try {
      const res = await axios.post("/api/comment", {
        content: data.comment,
        postID: post.id,
      });
      toast.success(res.data.message);
      queryClient.invalidateQueries(["comments", post.path]);

      reset();
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  return (
    <>
      {user && Object.entries(user).length > 0 ? (
        <div className="flex md:gap-4 gap-2">
          <Avatar
            src={user?.avatar}
            fallback={user?.name}
            alt={user?.username}
            as={Link}
            href={`/${user.username}`}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <form className="flex-1 " onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register("comment")}
              placeholder="Add to the discussion"
              className="text-base"
              size="lg"
              radius="sm"
              onFocus={() => setIsFocused(true)}
            />
            <div>
              {isFocused ? (
                <Button
                  color="primary"
                  radius="sm"
                  isDisabled={!isDirty || isSubmitting || !isValid}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      ) : (
        <div className="flex md:gap-4 gap-2">
          <Avatar fallback={"TEN"} className="w-8 h-8 md:w-10 md:h-10" />
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

      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
      {/* <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
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
      </Modal> */}
    </>
  );
};

export default AddComment;
