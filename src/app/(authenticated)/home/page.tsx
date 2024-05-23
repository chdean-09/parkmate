import prisma from "@/lib/db";
import MapComponent from "@/components/custom/maps/mapView";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ParkingLocation } from "@prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const fetchedMarkers = await prisma.parkingLocation.findMany({
    select: {
      latitude: true,
      longitude: true,
      ownerId: true,
      parkingSlots: {
        select: {
          x: true,
          y: true,
          occupied: true,
          userId: true,
        },
      },
    },
  });

  return (
    <main className="flex h-screen flex-col items-center px-3">
      <div className="w-[95%] sm:w-[80%] h-full mb-3">
        <MapComponent user={user} markerInfo={fetchedMarkers} />
      </div>
    </main>
  );
}
