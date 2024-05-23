"use server";

import prisma from "@/lib/db";
import { ParkingSlot } from "@prisma/client";
import { User } from "lucia";

export async function reserveSlot(
  slots: ParkingSlot[],
  locationId: number,
  name: string,
  baseRate: number,
  user: User,
) {
  try {
    const cost = slots.length * baseRate;

    await prisma.parkingSlot.updateMany({
      data: {
        occupiedAt: new Date(),
        occupied: true,
        userId: user.id,
      },
      where: {
        id: {
          in: slots.map((slot) => slot.id),
        },
        locationId: locationId,
      },
    });

    await prisma.transaction.create({
      include: {
        slot: true,
      },
      data: {
        name: name,
        amount: user.wallet - cost,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: `${error}` };
  }
}

export async function leaveSlot(slots: ParkingSlot[], locationId: number) {
  try {
    await prisma.parkingSlot.updateMany({
      data: {
        occupiedAt: null,
        occupied: false,
        userId: null,
      },
      where: {
        id: {
          in: slots.map((slot) => slot.id),
        },
        locationId: locationId,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: `${error}` };
  }
}
