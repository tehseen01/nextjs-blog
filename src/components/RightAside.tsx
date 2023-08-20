import { Button, Card, CardBody, CardFooter, User } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";

const RightAside = () => {
  return (
    <aside className=" max-lg:hidden">
      <h4 className="text-xl font-medium pb-4 pt-1">My reading list</h4>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className="border mb-2 p-2"
          >
            <CardBody className="p-2">
              <div className="flex">
                <h5 className="font-semibold break-all">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque, tempore.
                </h5>
              </div>
            </CardBody>
            <CardFooter className="p-2 flex justify-between">
              <User
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <div>
                <Button isIconOnly variant="light">
                  <Icon name="bookmark" strokeWidth={1.25} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </aside>
  );
};

export default RightAside;
