import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.models.posts || mongoose.model("posts", PostSchema);

export default Post;
