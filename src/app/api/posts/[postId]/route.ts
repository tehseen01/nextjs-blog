import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findFirst({
      where: { path: params.postId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        image: true,
        path: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            bio: true,
            followerIDs: true,
            followingIDs: true,
            site: true,
          },
        },
        comments: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            repliyId: true,
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
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
