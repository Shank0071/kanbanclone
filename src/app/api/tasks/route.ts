import { prisma } from "prisma/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request, response: Response) {
  const session = await getServerSession(authOptions);

  console.log("Session ff", session)

  if (session?.user) {
    const tasks = await prisma.task.findMany({
      where: {
        userId: (session as any)?.user?.id,
      },
    });
    return NextResponse.json(tasks);
  }

  if (!session?.user) {
    return NextResponse.json("some error occurred")
  }
  
}

export async function POST(request: Request) {
  let json = await request.json();
  const session = await getServerSession(authOptions);
  console.log("sess: ", session);
  console.log("json: ", json);
  try {
    const createdTask = await prisma.task.create({
      data: {
        ...json,
        user: {
          connect: {
            id: (session as any)?.user?.id + "",
          },
        },
      },
    });
    return NextResponse.json(createdTask, { status: 201 });
  } catch (err) {
    console.log("An error occurred: ", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
