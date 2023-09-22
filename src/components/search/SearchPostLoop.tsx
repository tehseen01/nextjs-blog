import { TPost } from "@/lib/types";
import React from "react";
import SearchNotMatch from "./SearchNotMatch";
import PostCard from "../posts/PostCard";

type TSearchPostLoopProp = {
  searchPost: TPost[];
};

const SearchPostLoop = ({ searchPost }: TSearchPostLoopProp) => {
  return (
    <>
      {searchPost && searchPost.length > 0 ? (
        searchPost.map((post: TPost) => <PostCard key={post.id} post={post} />)
      ) : (
        <SearchNotMatch />
      )}
    </>
  );
};

export default SearchPostLoop;
