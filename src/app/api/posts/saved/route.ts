import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

//@description     Save post for letter or remove from save letter
//@route           POST /api/posts/saved
//@access          Protected
export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);
    if (!userID)
      return NextResponse.json(
        { success: false, message: "You are not authorize!" },
        { status: 401 }
      );

    const savedPost = await prisma.savedPost.findMany({
      where: { userId: userID },
      include: {
        post: {
          select: {
            id: true,
            path: true,
            title: true,
            author: {
              select: {
                id: true,
                avatar: true,
                username: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(savedPost, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//@description     Save post for letter or remove from save letter
//@route           POST /api/posts/saved
//@access          Protected
export async function POST(req: NextRequest) {
  try {
    const { postID } = await req.json();
    if (!postID)
      return NextResponse.json(
        { success: false, message: "Please provide valid Post ID" },
        { status: 404 }
      );
    console.log(postID);

    const userID = await getDataFromToken(req);
    if (!userID)
      return NextResponse.json(
        { success: false, message: "You are not authorize" },
        { status: 401 }
      );

    const savePosts = await prisma.savedPost.findFirst({
      where: { userId: userID, postId: postID },
    });

    if (!savePosts) {
      await prisma.savedPost.create({
        data: { postId: postID, userId: userID },
      });

      return NextResponse.json(
        { success: true, message: "Post saved for letter" },
        { status: 201 }
      );
    } else {
      await prisma.savedPost.delete({ where: { id: savePosts.id } });

      return NextResponse.json(
        { success: true, message: "Post removed from saved letter" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
