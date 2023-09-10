import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import Link from "next/link";

const AuthModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <>
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
    </>
  );
};

export default AuthModal;
