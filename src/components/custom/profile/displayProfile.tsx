"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import { User } from "lucia";
import { ParkingLocation, ParkingSlot } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DisplayProfile({
  owner,
  createdLocations,
  slotsReserved,
}: {
  owner: User | undefined;
  createdLocations: (ParkingLocation & { parkingSlots: ParkingSlot[] })[];
  slotsReserved: (ParkingSlot & { location: ParkingLocation })[];
}) {
  if (!owner) {
    return (
      <div className="w-full flex flex-col px-5 py-7">
        <p className="text-white text-3xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative rounded-full border p-5 flex items-center justify-center my-8">
        <Image
          src="/user.png"
          alt="Account icons created by khulqi Rosyid - Flaticon"
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="font-semibold text-3xl">{owner.username}</p>
      {/* INFO */}
      <div className="w-full flex items-center justify-center my-7">
        <div className="flex gap-3 h-10 items-center">
          {owner.role === "ADMIN" && (
            <>
              <div className="flex flex-col text-center">
                <p className="font-bold text-xl">{createdLocations.length}</p>
                <p className="text-blue-700">Owned</p>
              </div>
              <Separator orientation="vertical" />
            </>
          )}
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">{slotsReserved.length}</p>
            <p className="text-blue-700">Reserved</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center">
            <p className="font-bold text-xl">
              {convertToPhPesoFormat(owner.wallet)}
            </p>
            <p className="text-blue-700">Balance</p>
          </div>
        </div>
      </div>

      {/* Redirect Buttons */}
      <div className="w-full text-center">
        {/* E-Wallet */}
        <Button asChild variant={"ghost"} className="w-full ">
          <Link role="wallet-link" href="/wallet">
            Transactions
          </Link>
        </Button>
        <Separator />

        <Button asChild variant={"ghost"} className="w-full ">
          <Link role="cashin-link" href="/cashin">
            Cash In
          </Link>
        </Button>
        <Separator />
      </div>

      <div
        className={`grid ${owner.role === "ADMIN" ? "md:grid-cols-2" : "grid-cols-1"} gap-6 my-6`}
      >
        <Card className="w-[500px] h-fit">
          <CardHeader>
            <CardTitle>Slot Reservations</CardTitle>
            <CardDescription>Check out your reserved slots</CardDescription>
          </CardHeader>
          <CardContent>
            {slotsReserved.length === 0 && (
              <p className="text-center">No slots reserved</p>
            )}
            {slotsReserved.length > 0 &&
              slotsReserved.map((slot) => (
                <div
                  key={slot.unique_id}
                  className="p-2 my-2 flex flex-row items-center justify-between"
                >
                  <div className="flex flex-col">
                    <p className="font-bold">
                      {slot.location.name}, slot #{slot.id}
                    </p>
                    <p className="font-extralight text-sm">
                      Base: {convertToPhPesoFormat(slot.location.baseRate)}{" "}
                      {", "}
                      Hourly: {convertToPhPesoFormat(slot.location.hourlyRate)}
                    </p>
                  </div>

                  <Button asChild className="">
                    <Link
                      role="cashin-link"
                      href={`/reserve/${slot.location.latitude}/${slot.location.longitude}`}
                    >
                      Check it out
                    </Link>
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card>

        {owner.role === "ADMIN" && (
          <Card className="w-[500px] h-fit">
            <CardHeader>
              <CardTitle>Created Locations</CardTitle>
              <CardDescription>
                Check out your parking locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {createdLocations.length === 0 && (
                <p className="text-center">No locations created</p>
              )}
              {createdLocations.length > 0 &&
                createdLocations.map((location) => (
                  <div
                    key={location.id}
                    className="p-2 my-2 flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold">{location.name}</p>
                      <p className="font-extralight text-sm">
                        Base: {convertToPhPesoFormat(100)} {", "}
                        Hourly: {convertToPhPesoFormat(99)}
                      </p>
                      <p className="font-extralight text-sm">
                        Total slots: {location.parkingSlots.length}
                      </p>
                    </div>

                    <Button asChild className="">
                      <Link
                        role="cashin-link"
                        href={`/editor/${location.latitude}/${location.longitude}`}
                      >
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default DisplayProfile;
