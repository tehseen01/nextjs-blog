import { Button } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

const Editor = () => {
  const [contentValue, setContentValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <section className="sm:w-5/6 w-full mx-auto">
      <form
        action=""
        className="h-[calc(100vh_-_140px)] overflow-y-auto bg-white rounded-md border"
      >
        <div className="h-full">
          <div className="py-4 px-8">
            <textarea
              name="title"
              id="title"
              aria-label="Post Title"
              placeholder="New post title here..."
              className="lg:text-5xl md:text-4xl text-3xl leading-tight resize-none w-full md:font-extrabold font-bold outline-none placeholder:text-slate-900"
            />
          </div>
          <div className="bg-gray-100 py-4 px-8 h-16">hello there</div>
          <div className="py-4 px-8">
            <textarea
              ref={textareaRef}
              name="content"
              id="content"
              aria-label="Post content"
              placeholder="Write your post content here..."
              className="resize-none w-full outline-none overflow-hidden"
              style={{ minHeight: `${textareaRef.current?.scrollHeight}px` }}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="pt-4 flex items-center gap-4">
        <Button color="primary" radius="sm">
          Publish
        </Button>
        <Button variant="light" color="primary" radius="sm">
          Save Draft
        </Button>
      </div>
    </section>
  );
};

export default Editor;
