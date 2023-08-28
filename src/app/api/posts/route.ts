import prisma from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);

    const { title, content } = await req.json();

    const makePath = title.split(" ").join("-");

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        path: makePath,
        authorId: userID,
      },
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully", newPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
