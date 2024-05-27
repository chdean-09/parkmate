import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { hashedPassword, ...userWithoutPassword } = user;
    
    return NextResponse.json({ data: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        message: "An error occurred while deleting the user",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url).searchParams;
    const userId: string = url.get("userId") || "0";

    const user = await prisma.user.delete({
      where: { id: userId },
    });

    console.log("User deleted" + userId, user);

    return NextResponse.json(
      {
        message: `Successfully deleted user with ID ${userId}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        message: "An error occurred while deleting the user",
      },
      { status: 500 }
    );
  }
}
