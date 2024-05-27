"use server";

import prisma from "@/lib/db";
import { User } from "lucia";
import { revalidatePath } from "next/cache";

export async function reserveSlot(
  uniqueId: number,
  name: string,
  baseRate: number,
  user: User,
): Promise<{ message: string } | void> {
  try {
    if (user.wallet < baseRate) {
      return { message: "Not enough wallet balance" };
    }

    await fetch(`${process.env.URL}/api/slot/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId,
        name,
        baseRate,
        user,
      }),
    });

    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
    return { message: `${error}` };
  }
}

export async function leaveSlot(
  slot: { id: string },
  locationId: number,
): Promise<{ message: string } | void> {
  try {
    await fetch(`${process.env.URL}/api/slot/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot,
        locationId,
      }),
    });

    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
    return { message: `${error}` };
  }
}
