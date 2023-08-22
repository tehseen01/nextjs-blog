import { connect } from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Post from "@/models/PostModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);

    const post = await Post.find({ author: userID });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
