import { setCookie } from "nookies";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { cookies } from "next/headers";
import serialize from "nookies";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { name, username } = req.body;

  let passedvalue = await new Response(req.body).text();

  let valueJson = JSON.parse(passedvalue);

  const { name, username } = valueJson;

  console.log(req.body);

  // const data = await req.json();

  // const { name, username } = data;

  console.log(name, username);
  // const data = await req;
  // const username = await req.body.username;
  // console.log(req.body.name, req.body.username);

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // if (userExists) {
  //   return new NextResponse("Error", {
  //     status: 400,
  //     statusText: "Username already taken.",
  //   });
  // }

  // if (userExists) {
  //   return res.status(400).json({ message: "Username already taken." });
  // }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  // res.cookies.set({
  //   name: "@ignitecall:userId",
  //   value: user.id,
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: "/",
  // });

  // res = new NextResponse(JSON.stringify(user), {
  //   status: 201,

  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // setCookie({ res }, "@ignitecall:userId", user.id, {
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: "/",
  // });

  // return new NextResponse("Error", {
  //   status: 400,
  //   statusText: "Username already taken.",
  // });

  // res.cookies.set("@ignitecall:userId", JSON.stringify(user.id), {
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  // });

  // console.log(res.cookies.get("@ignitecall:userId"));

  // const cookies = nookies.get({ req });

  nookies.set({ res }, "@ignitecall:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  console.log(user.id);

  // return new Response("OK", {
  //   status: 200,
  //   headers: { "Set-Cookie": `@ignitecall:userId=${user.id}` },
  // });
  // return new NextResponse(JSON.stringify(user), {
  //   status: 201,

  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // res.writeHead(201, { "Content-Type": "application/json" });
  // res.end(JSON.stringify(user));
  // return res;

  // async function auth(req: NextApiRequest, res: NextApiResponse) {
  //   return NextAuth(req, res, buildNextAuthOptions(req, res));
  // }

  return new Response("", {
    status: 200,
    headers: {
      "Set-Cookie": `@ignitecall:userId=${user.id}; max-age=${
        60 * 60 * 24 * 7
      }; path=/`,
    },
  });
}

export { handler as POST, handler as GET };
