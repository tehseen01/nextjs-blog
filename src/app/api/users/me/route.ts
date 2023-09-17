import prisma from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "You are not authorize" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        createdAt: true,
        site: true,
        followerIDs: true,
        followingIDs: true,
        followingTags: true,
        follower: true,
        following: true,
        updatedAt: true,
        posts: true,
        email: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
