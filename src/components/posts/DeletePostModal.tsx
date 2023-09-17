"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { TPost } from "@/lib/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type TDeletePostModalProp = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  post: { path: string; id: string };
  type: "single post" | "dashboard";
};

const DeletePostModal = ({
  isOpen,
  onOpenChange,
  onClose,
  post,
  type,
}: TDeletePostModalProp) => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const deletePost = async () => {
    const { data } = await axios.delete(
      `/api/posts/${post.path}?id=${post.id}`
    );
    return data;
  };

  const { mutate, isLoading } = useMutation(deletePost, {
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      onClose();
      if (type === "dashboard") {
        queryClient.invalidateQueries(["dashboard", user?.username]);
      } else {
        router.push("/");
      }
    },
    onError: (data: any) => {
      toast.error(data.message);
      console.log(data);
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        radius="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Are you sure you want to delete this post?
              </ModalHeader>
              <ModalBody>
                <p>
                  You cannot undo this action, perhaps you just want to edit
                  instead?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => mutate()}
                  radius="sm"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? "Deleting" : "Yes, Delete"}
                </Button>
                <Button onPress={onClose} radius="sm">
                  No, Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePostModal;
