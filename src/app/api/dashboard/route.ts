import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

//@description     access the dashboard for login user
//@route           GET /api/dashboard
//@access          protected
export async function GET(req: NextRequest) {
  try {
    const postFilter = req.nextUrl.searchParams.get("filter");

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
        avatar: true,
        name: true,
        username: true,
        posts: {
          orderBy: (() => {
            switch (postFilter) {
              case "recently_created":
                return { createdAt: "desc" };
              case "most_views":
                return { views: "desc" };
              default:
                return { createdAt: "desc" };
            }
          })(),
          where: (() => {
            if (postFilter === "DRAFT" || postFilter === "PUBLISHED") {
              return { type: postFilter };
            } else {
              return {};
            }
          })(),
          select: {
            id: true,
            title: true,
            type: true,
            path: true,
            _count: {
              select: { comments: true },
            },
            views: true,
            createdAt: true,
            comments: {
              select: {
                _count: { select: { replies: true } },
              },
            },
          },
        },
        _count: {
          select: {
            follower: true,
            comment: true,
            following: true,
            followingTags: true,
            posts: true,
            replies: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "You are not authorize plz log in first" },
        { status: 401 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
