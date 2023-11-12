import User from "@/server/models/userModel";
import { NextResponse } from "next/server";
import connectDB from "@/server/database/mongodb";

export const register = async (req) => {
  try {
    const { username, fullName, email, provider, image, emailVerified } = req;
    await connectDB();
    const user = await User.findOne({ email, provider });
    if (user) {
      return NextResponse.json(
        { message: "User already exit." },
        { status: 400 }
      );
    }
    await User.create({
      username,
      fullName,
      email,
      password: email + "&" + username,
      provider,
      image,
      emailVerified,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
};
