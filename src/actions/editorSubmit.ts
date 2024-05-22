"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { User } from "lucia";
import { revalidatePath } from "next/cache";

export async function submitLocation(formData: FormData, owner: User) {
  try {
    const name = formData.get("name");
    const baseRate = formData.get("baseRate");
    const hourlyRate = formData.get("hourlyRate");
    const gridLayout: OccupiedSlot = JSON.parse(
      formData.get("gridLayout") as string,
    );
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    await prisma.parkingLocation.create({
      data: {
        ownerId: owner.id,
        name: name as string,
        baseRate: Number(baseRate),
        hourlyRate: Number(hourlyRate),
        latitude: Number(latitude),
        longitude: Number(longitude),
        parkingSlots: {
          createMany: {
            data: gridLayout,
          },
        },
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case "P2002":
          return { success: false, message: "Duplicate entry" };
        // Add more cases for other known error codes
        default:
          return { success: false, message: "An unknown error occurred" };
      }
    } else {
      // Handle all other errors
      return { success: false, message: `${error}` };
    }
  }
}

export async function updateLocation(formData: FormData, owner: User) {
  try {
    const name = formData.get("name");
    const baseRate = formData.get("baseRate");
    const hourlyRate = formData.get("hourlyRate");
    const gridLayout: OccupiedSlot = JSON.parse(
      formData.get("gridLayout") as string,
    );
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    await prisma.parkingLocation.create({
      data: {
        ownerId: owner.id,
        name: name as string,
        baseRate: Number(baseRate),
        hourlyRate: Number(hourlyRate),
        latitude: Number(latitude),
        longitude: Number(longitude),
        parkingSlots: {
          createMany: {
            data: gridLayout,
          },
        },
      },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case "P2002":
          return { success: false, message: "Duplicate entry" };
        // Add more cases for other known error codes
        default:
          return { success: false, message: "An unknown error occurred" };
      }
    } else {
      // Handle all other errors
      return { success: false, message: `${error}` };
    }
  }
}
