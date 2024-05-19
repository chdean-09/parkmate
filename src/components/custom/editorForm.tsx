"use client";

import { useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomParkingGrid from "./parkingGrid";
import { useState } from "react";
import { GridStackOptions, GridStackWidget } from "gridstack";

export default function EditorForm() {
  const searchParams = useSearchParams();

  const lat = searchParams.getAll("lat");
  const lng = searchParams.getAll("lng");

  const [layout, setLayout] = useState<GridStackWidget[] | GridStackOptions>(
    [],
  );
  console.log(layout, "ahahh");

  return (
    <section className="w-[95%] flex flex-col items-center">
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
      </div>
      <div className="w-full mb-6">
        <CustomParkingGrid setLayout={setLayout} />
      </div>
    </section>
  );
}
