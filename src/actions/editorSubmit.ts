"use server";

import prisma from "@/lib/db";
import { Prisma, ParkingSlot } from "@prisma/client";
import { User } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitLocation(formData: FormData, owner: User) {
  try {
    const name = formData.get("name");
    const baseRate = formData.get("baseRate");
    const hourlyRate = formData.get("hourlyRate");
    const gridLayout: ParkingSlot[] = JSON.parse(
      formData.get("gridLayout") as string,
    );
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    await fetch(`${process.env.URL}/api/parking-location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner,
        ownerId: owner.id,
        name,
        baseRate,
        hourlyRate,
        latitude,
        longitude,
        gridLayout,
      }),
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
    }

    throw error;
  }
}

export async function updateLocation(formData: FormData) {
  try {
    const name = formData.get("name");
    const baseRate = formData.get("baseRate");
    const hourlyRate = formData.get("hourlyRate");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    await fetch(`${process.env.URL}/api/parking-location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        baseRate,
        hourlyRate,
        latitude,
        longitude,
      }),
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
    }

    throw error;
  }
}

export async function deleteLocation(latitude: number, longitude: number) {
  try {
    await fetch(`${process.env.URL}/api/parking-location`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    });

    revalidatePath("/", "layout");
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
    }

    throw error;
  } finally {
    redirect("/home");
  }
}
