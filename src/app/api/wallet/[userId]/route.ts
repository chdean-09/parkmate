import prisma from "@/lib/db";
import { Transaction } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const userWallet: Transaction[] = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userWallet) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wallet: userWallet }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the wallet",
      },
      { status: 500 }
    );
  }
}
