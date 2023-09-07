import prisma from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, postID } = await req.json();

    if (!content || !postID) {
      return NextResponse.json(
        { success: false, message: "Something went wrong please try again!" },
        { status: 500 }
      );
    }

    const userID = await getDataFromToken(req);

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please try login first!" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postID } });
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found please provide correct postID",
        },
        { status: 500 }
      );
    }

    await prisma.comment.create({
      data: { content: content, authorId: userID, postId: postID },
    });

    return NextResponse.json(
      { success: true, message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const commentId = req.nextUrl.searchParams.get("id");
    console.log(commentId);
    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid comment Id" },
        { status: 500 }
      );
    }

    const userID = await getDataFromToken(req);

    await prisma.comment.delete({ where: { id: commentId, authorId: userID } });

    return NextResponse.json(
      { success: true, message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
