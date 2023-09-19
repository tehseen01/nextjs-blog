import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
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

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Invalid data send!" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        replies: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                avatar: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        _count: { select: { replies: true } },
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE COMMENT WITH ALL REPLIES
export async function DELETE(req: NextRequest) {
  try {
    const commentId = req.nextUrl.searchParams.get("id");

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid comment Id" },
        { status: 500 }
      );
    }

    const userID = await getDataFromToken(req);

    // Check if the comment exists and if it belongs to the user
    const existingComment = await prisma.comment.findFirst({
      where: { id: commentId, authorId: userID },
    });

    if (!existingComment) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found or doesn't belong to the user",
        },
        { status: 404 } // Not Found
      );
    }

    // Find and delete all associated replies
    const repliesToDelete = await prisma.reply.findMany({
      where: { commentId },
    });

    // Delete the associated replies
    for (const reply of repliesToDelete) {
      await prisma.reply.delete({ where: { id: reply.id } });
    }

    await prisma.comment.delete({ where: { id: commentId, authorId: userID } });

    return NextResponse.json(
      { success: true, message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
