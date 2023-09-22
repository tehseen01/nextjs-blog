import useQueryString from "@/hooks/useQueryString";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Icon from "../Icon";
import { Input } from "@nextui-org/react";

const SearchInput = () => {
  const router = useRouter();
  const { createQueryString } = useQueryString();

  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?${createQueryString("q", searchInput)}`);
          setSearchInput("");
        }}
        className="relative"
      >
        <Input
          classNames={{
            base: "h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="sm"
          startContent={
            <button type="submit">
              <Icon name="search" />
            </button>
          }
          type="search"
        />
      </form>
    </>
  );
};

export default SearchInput;
