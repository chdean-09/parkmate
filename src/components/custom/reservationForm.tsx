"use client";

import { User } from "lucia";
import { ParkingLocation, ParkingSlot } from "@prisma/client";

export default function ReservationForm({
  owner,
  fetchedData,
}: {
  owner: User;
  fetchedData: ParkingLocation & { parkingSlots: ParkingSlot[] };
}) {
  return <div>{fetchedData.name}</div>;
}
