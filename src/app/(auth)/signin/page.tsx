"use client";

import React from "react";

import { Button, Input, Link } from "@nextui-org/react";

import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignInSchemaType, signInSchema } from "@/lib/validation/signInSchema";

import axios from "axios";

import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInSchemaType>({ resolver: zodResolver(signInSchema) });

  const onSubmitHandle: SubmitHandler<SignInSchemaType> = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);

      toast.success(res.data.message);
      reset();

      router.push("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center h-[calc(100vh_-_75px)]">
      <div className="sm:w-2/5 w-11/12">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome back to next-blog
        </h1>
        <div className="mt-4 mb-10">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" as={NextLink} underline="always">
              Create an account
            </Link>
          </p>
        </div>
        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmit(onSubmitHandle)}
          autoComplete="off"
        >
          <Input
            type="email"
            label="Email"
            variant="bordered"
            radius="sm"
            size="lg"
            labelPlacement="outside"
            placeholder="Enter your email"
            {...register("email")}
            validationState={errors.email ? "invalid" : "valid"}
            color={errors.email ? "danger" : "default"}
            errorMessage={errors.email && errors.email.message}
          />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            radius="sm"
            size="lg"
            labelPlacement="outside"
            placeholder="Enter your password"
            {...register("password")}
            validationState={errors.password ? "invalid" : "valid"}
            color={errors.password ? "danger" : "default"}
            errorMessage={errors.password && errors.password.message}
          />
          <Button
            color="primary"
            radius="sm"
            className="w-full mt-4"
            size="lg"
            type="submit"
            isLoading={isSubmitting ? true : false}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4">
          <Link href="/" underline="hover">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
