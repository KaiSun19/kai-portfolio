import bcrypt from "bcryptjs";
import clientPromise from "../../../../utils/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("KaiPortfolio");

  // Check if the user already exists
  const existingUser = await db.collection("users").findOne({ username });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  await db.collection("users").insertOne({
    username,
    password: hashedPassword,
  });

  // Create a JWT
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const response = NextResponse.json({ token }, { status: 200 });

  response.cookies.set("authToken", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 24 hours
  });

  return response;
}
