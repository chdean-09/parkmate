"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { User } from "lucia";
import { revalidatePath } from "next/cache";

export async function cashIn(formData: FormData, owner: User | undefined) {
  try {
    if (!owner) {
      return { success: false, message: "User not found" };
    }

    const amount = formData.get("amount");

    if (!amount || Number(amount) < 0 || Number(amount) > 100000) {
      return {
        success: false,
        message: "Invalid amount. Amount must be between 0 and 100,000.",
      };
    }

    // increment wallet
    await prisma.user.update({
      where: {
        id: owner.id,
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
        userId: owner.id,
        name: "Cash In",
      },
    });

    revalidatePath("/profile", "page");
    revalidatePath("/wallet", "page");

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
