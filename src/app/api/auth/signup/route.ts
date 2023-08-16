import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const bodyData = await req.json();
    const { name, username, email, password } = bodyData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exist!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const tokenData = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
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
      {
        success: true,
        message: "Account created successfully",
      },
      { status: 200 }
    );
    response.cookies.set("token", token, options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
