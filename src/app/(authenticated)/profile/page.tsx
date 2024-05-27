import DisplayProfile from "@/components/custom/profile/displayProfile";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate = 0;

export default async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const createdLocations = await prisma.parkingLocation.findMany({
    include: {
      parkingSlots: true,
    },
    where: {
      ownerId: user.id,
    },
  });

  const slotsReserved = await prisma.parkingSlot.findMany({
    include: {
      location: true,
    },
    where: {
      userId: user.id,
    },
  });

  return (
    <div>
      <DisplayProfile
        owner={user}
        createdLocations={user.role === "ADMIN" ? createdLocations : []}
        slotsReserved={slotsReserved}
      />
    </div>
  );
}
