import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);
    const user = await User.findOne({ _id: userID }).select("-password");

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
