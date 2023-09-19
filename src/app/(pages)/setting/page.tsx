"use client";

import Icon from "@/components/Icon";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  TEditProfileType,
  editProfileData,
} from "@/lib/validation/editProfileSchema";
import { convertImageToBase64 } from "@/utils/convertImageTobase64";

import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const SettingPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [convertedImage, setConvertedImage] = useState<any>();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TEditProfileType>({
    resolver: zodResolver(editProfileData),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
      site: user?.site,
    },
  });

  const onSubmitHandler: SubmitHandler<TEditProfileType> = async (data) => {
    try {
      data.file = convertedImage;
      const res = await axios.put("/api/users/me", data);
      console.log(res.data);
      await queryClient.invalidateQueries(["me"]);
      toast.success(res.data.message);
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const convertedImage = await convertImageToBase64(file);
    setConvertedImage(convertedImage);
  };

  const removeImage = () => {
    setValue("file", undefined);
    setConvertedImage(null);
  };

  return (
    <section>
      <h1 className="md:text-2xl md:font-semibold text-xl font-medium text-primary-500 hover:text-primary-700">
        <Link href={`/${user?.username}`}>@ {user?.username}</Link>
      </h1>
      <form className="" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="md:p-4 p-2 mt-4 flex flex-col gap-4 border rounded-md">
          <h3 className="md:text-2xl md:font-bold text-xl font-semibold">
            User
          </h3>
          <Input
            {...register("name")}
            label="Name"
            type="text"
            radius="sm"
            labelPlacement="outside"
            placeholder="Update your name"
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name && errors.name.message}
          />
          <Input
            {...register("email")}
            label="Email"
            type="email"
            radius="sm"
            labelPlacement="outside"
            placeholder="Update your email"
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email && errors.email.message}
          />
          <Input
            {...register("username")}
            label="Username"
            type="text"
            radius="sm"
            labelPlacement="outside"
            placeholder="Update your username"
            isInvalid={errors.username ? true : false}
            errorMessage={errors.username && errors.username.message}
          />
          <div>
            <span className="block mb-2 font-medium">Avatar</span>
            <div className="flex items-center gap-4 relative">
              <Avatar
                name={user?.name}
                src={convertedImage ? convertedImage : user?.avatar}
                size="lg"
                alt={user?.name}
              />
              <Input
                {...register("file")}
                placeholder="Update your name"
                type="file"
                radius="sm"
                size="lg"
                className="flex-1"
                accept="image/*"
                onChange={handleImage}
              />
              {convertedImage && (
                <Button
                  variant="light"
                  className="absolute top-0 right-0"
                  isIconOnly
                  color="danger"
                  onClick={removeImage}
                >
                  <Icon name="x" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:p-4 p-2 mt-6 flex flex-col gap-4 border rounded-md">
          <h3 className="md:text-2xl md:font-bold text-xl font-semibold">
            Basic
          </h3>
          <Input
            {...register("site")}
            label="Website URL"
            labelPlacement="outside"
            placeholder="https://ten-blog.vercel.app"
            type="text"
            radius="sm"
          />
          <Textarea
            {...register("bio")}
            label="Bio"
            labelPlacement="outside"
            placeholder="A sort bio..."
            type="text"
            radius="sm"
          />
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            radius="sm"
            color="primary"
            fullWidth
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Save profile information"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SettingPage;
