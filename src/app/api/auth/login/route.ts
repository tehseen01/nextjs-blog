import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 400 }
      );
    }

    const tokenData = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "30 days",
    });

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
