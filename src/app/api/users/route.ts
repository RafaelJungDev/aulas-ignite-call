import { setCookie } from "nookies";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request) {
  const body = await request.json();

  return new Response(body);
}

export async function POST(request: Request) {
  const { name, username } = await request.json();

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "Username already taken.",
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  const res = new NextResponse("Success");

  res.cookies.set({
    name: "@ignitecall:id",
    value: user.id,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // setCookie(res, "@ignitecall:userId", user.id, {
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: "/",
  // });

  // return new NextResponse("Error", {
  //   status: 400,
  //   statusText: "Username already taken.",
  // });

  return new NextResponse(JSON.stringify(user));
  // res.status(201).json(user);
}
