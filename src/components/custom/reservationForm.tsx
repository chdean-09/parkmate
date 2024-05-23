"use client";

import { User } from "lucia";
import { ParkingLocation, ParkingSlot } from "@prisma/client";
import { reserveSlot } from "@/actions/reserveSlot";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ReservationForm({
  user,
  fetchedData,
}: {
  user: User;
  fetchedData: ParkingLocation & { parkingSlots: ParkingSlot[] };
}) {
  const router = useRouter();

  const [slots, setSlots] = useState<ParkingSlot[]>([]);

  async function handleSubmit() {
    const result = await reserveSlot(
      fetchedData.parkingSlots,
      fetchedData.parkingSlots[0].locationId,
      fetchedData.name,
      fetchedData.baseRate,
      user,
    );

    if (result) {
      if (result.success) {
        router.push("/home");
      } else {
        console.log("oh no");
      }
    }
  }

  return (
    <div>
      <div>Wallet: {user.wallet}</div>
      <div>Base Rate: {fetchedData.baseRate}</div>
      <div>Hourly Rate: {fetchedData.hourlyRate}</div>
      {/* insert ang parking spots diri tas kada pindot mo ga dugang sa slots na use state */}
      <Button
        onClick={handleSubmit}
        disabled={user.wallet < fetchedData.baseRate * slots.length}
      >
        Reserve
      </Button>
    </div>
  );
}
