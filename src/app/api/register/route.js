import connectDB from "@/server/database/mongodb";
import User from "@/server/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ message: "User already exit." }, { status: 400 });
    }
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
