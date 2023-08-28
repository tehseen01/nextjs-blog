import prisma from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await req.json();
    const currentUserId = await getDataFromToken(req);

    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "Current user not found" },
        { status: 404 }
      );
    }

    if (currentUser.followingIDs.includes(userId)) {
      // UnFollow
      await prisma.user.update({
        where: { id: currentUserId },
        data: { following: { disconnect: { id: userId } } },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { follower: { disconnect: { id: currentUserId } } },
      });

      return NextResponse.json(
        { success: true, message: "User unFollowed successfully" },
        { status: 200 }
      );
    } else {
      // Follow
      await prisma.user.update({
        where: { id: currentUserId },
        data: { following: { connect: { id: userId } } },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { follower: { connect: { id: currentUserId } } },
      });
    }

    return NextResponse.json(
      { success: true, message: "User followed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
