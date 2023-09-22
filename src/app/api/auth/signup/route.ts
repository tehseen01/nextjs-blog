import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const bodyData = await req.json();
    const { name, username, email, password } = bodyData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exist!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    const tokenData = {
      id: newUser.id,
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
