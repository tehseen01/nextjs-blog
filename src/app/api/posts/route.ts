import { connect } from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);

    const { title, content } = await req.json();

    const postObj = {
      title,
      content,
      author: userID,
    };

    const newPost = await Post.create(postObj);

    const user = await User.findById(userID);

    user.posts.push(newPost._id);
    await user.save();

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
