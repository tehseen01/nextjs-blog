"use client";

import NextLink from "next/link";

import { Input, Button, Link } from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, signUpSchemaType } from "@/lib/validation/signUpSchema";

const Page = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmitHandle: SubmitHandler<signUpSchemaType> = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center h-[calc(100vh_-_75px)]">
      <div className="sm:w-2/5 w-11/12">
        <h1 className="text-3xl font-semibold mb-4">Create an account</h1>
        <div className="mt-4 mb-10">
          <p>
            Already have an account?{" "}
            <Link href="/signin" as={NextLink} underline="always">
              Sign in
            </Link>
          </p>
        </div>
        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <Input
            type="text"
            label="Name"
            variant="bordered"
            radius="sm"
            {...register("name")}
            validationState={errors.name ? "invalid" : "valid"}
            color={errors.name ? "danger" : "default"}
            errorMessage={errors.name && errors.name.message}
          />
          <Input
            type="text"
            label="Username"
            variant="bordered"
            radius="sm"
            {...register("username")}
            validationState={errors.username ? "invalid" : "valid"}
            color={errors.username ? "danger" : "default"}
            errorMessage={errors.username && errors.username.message}
          />
          <Input
            type="email"
            label="Email"
            variant="bordered"
            radius="sm"
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
            {isSubmitting ? "Loading..." : "Create account"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Page;
