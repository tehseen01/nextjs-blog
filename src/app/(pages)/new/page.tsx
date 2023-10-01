import React from "react";
import Editor from "@/components/posts/Editor";

const Page = () => {
  return (
    <main className="fixed inset-0 w-full h-full bg-background z-50 ">
      <Editor post={null} />
    </main>
  );
};

export default Page;
