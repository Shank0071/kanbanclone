import { prisma } from "prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const task = await prisma.task.findUnique({ where: { id: id } });
  return NextResponse.json(task);
}


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: json,
    });
  
    if (!updatedTask) {
      return new NextResponse("No user with ID found", { status: 404 });
    }
  
    return NextResponse.json(updatedTask);
  } catch(error) {
    console.log("error: ", error)
    return new NextResponse("An error occurred", { status: 500 })
  }
}


