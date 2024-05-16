"use client";
import { useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomParkingGrid from "./parkingGrid";

export default function EditorForm() {
  const searchParams = useSearchParams();

  const lat = searchParams.getAll("lat");
  const lng = searchParams.getAll("lng");

  return (
    <div>
      lat:{lat} and lng:{lng}
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            defaultValue="Parking spot for SM"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rate" className="text-right">
            rate per hour
          </Label>
          <Input id="rate" defaultValue="0" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="slot-num" className="text-right">
            parking slots
          </Label>
          <Input
            id="slot-num"
            defaultValue="0"
            className="col-span-3"
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="grid items-center border border-black">
          <CustomParkingGrid num={1} />
        </div>
      </div>
    </div>
  );
}
