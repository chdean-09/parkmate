"use client";

import { useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomParkingGrid from "./parkingGrid";
import { useState } from "react";

export default function EditorForm() {
  const searchParams = useSearchParams();

  const lat = searchParams.getAll("lat");
  const lng = searchParams.getAll("lng");

  const [parkingSlotsNum, setParkingSlotsNum] = useState(0);

  return (
    <section className="w-[85%] flex flex-col items-center">
      lat:{lat} and lng:{lng}
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Parking Location Name"
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="base" className="text-right">
            Base/Starting Rate (₱)
          </Label>
          <Input id="base" placeholder="0.00" className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rate" className="text-right">
            Rate per Hour (₱/hr)
          </Label>
          <Input id="rate" placeholder="0.00" className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="slot-num" className="text-right">
            Number of Parking Slots
          </Label>
          <Input
            id="slot-num"
            className="col-span-3"
            value={parkingSlotsNum}
            onChange={(event) => setParkingSlotsNum(Number(event.target.value))}
            required
          />
        </div>
      </div>
      <div className="w-full border border-black mb-6">
        <CustomParkingGrid
          parkingSlotNum={parkingSlotsNum}
          setSlotNumChange={setParkingSlotsNum}
        />
      </div>
    </section>
  );
}
