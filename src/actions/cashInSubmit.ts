"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { User } from "lucia";
import { revalidatePath } from "next/cache";

export async function cashIn(amount: number, userId: string) {
  try {
    if (!userId) {
      return { success: false, message: "User not found" };
    }

    if (!amount || Number(amount) < 0 || Number(amount) > 100000) {
      return {
        success: false,
        message: "Invalid amount. Amount must be between 0 and 100,000.",
      };
    }

    // increment wallet
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        wallet: {
          increment: Number(amount),
        }
      },
    });

    //create transaction
    await prisma.transaction.create({
      data: {
        amount: Number(amount),
        userId: userId,
        name: "Cash In",
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/wallet", "page");
    revalidatePath("/wallet/[userId]", "page");

    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return { success: false, message: "An unknown error occurred" };
      }
    } else {
      return { success: false, message: `${error}` };
    }
  }
}
