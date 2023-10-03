import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: { username: params.username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        followerIDs: true,
        followingIDs: true,
        comment: true,
        followingTags: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          where: { NOT: { type: "DRAFT" } },
          include: {
            _count: { select: { comments: true } },
            saved: true,
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
