import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const storeCookieToken = (user: any) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET!, {
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
        token,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, options);

    return response;
  } catch (error) {
    console.log(error);
  }
};
