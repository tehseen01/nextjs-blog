import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    if (query) {
      const queryTags = await prisma.tag.findMany({
        where: { value: { contains: query, mode: "insensitive" } },
        take: 20,
      });

      return NextResponse.json(queryTags, { status: 200 });
    } else {
      const tags = await prisma.tag.findMany({ take: 20 });

      return NextResponse.json(tags, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
