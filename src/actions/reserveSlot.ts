"use server";

import prisma from "@/lib/db";
import { User } from "lucia";
import { revalidatePath } from "next/cache";

export async function reserveSlot(
  slot: { locationId: number; id: string },
  name: string,
  baseRate: number,
  user: User,
): Promise<{ message: string } | void> {
  try {
    if (user.wallet < baseRate) {
      return { message: "Not enough wallet balance" };
    }

    // sets parking slot status to occupied
    await prisma.parkingSlot.updateMany({
      data: {
        occupiedAt: new Date(),
        occupied: true,
        userId: user.id,
      },
      where: {
        AND: [
          {
            id: slot.id,
          },
          {
            locationId: slot.locationId,
          },
        ],
      },
    });

    // creates a transaction for history keeping
    await prisma.transaction.create({
      data: {
        name: `Slot reservation at ${name}`,
        amount: -baseRate,
        userId: user.id,
      },
    });

    // updates user wallet amount
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        wallet: {
          decrement: baseRate,
        },
      },
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
    await prisma.parkingSlot.updateMany({
      data: {
        occupiedAt: null,
        occupied: false,
        userId: null,
      },
      where: {
        AND: [
          {
            id: slot.id,
          },
          {
            locationId: locationId,
          },
        ],
      },
    });

    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
    return { message: `${error}` };
  }
}
