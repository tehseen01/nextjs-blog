import prisma from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);
    const user = await prisma.user.findFirst({ where: { id: userID } });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
