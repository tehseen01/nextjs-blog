import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      include: { Post: { select: { _count: true } } },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
