import EditorForm from "@/components/custom/editorForm";
import { ChevronLeft } from "lucide-react";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Editor({
  params,
}: {
  params: { latitude: number; longitude: number };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  } else if (user.role !== "ADMIN") {
    return redirect("/home");
  }

  const latitude = Number(params.latitude);
  const longitude = Number(params.longitude);

  const locationExists = await prisma.parkingLocation.findFirst({
    include: {
      parkingSlots: true,
    },
    where: {
      latitude: latitude,
      longitude: longitude,
    },
  });

  if (locationExists && locationExists.ownerId !== user.id) {
    return redirect("/home");
  }

  return (
    <div className="relative h-fit flex flex-col items-center py-3">
      <div className="absolute left-0 top-0 flex flex-row">
        <Link href="/home" className="text-lg font-bold text-black">
          <ChevronLeft color="black" className="h-8 w-8" />
        </Link>
        <h1 className="hidden sm:block ml-2 text-2xl font-bold">Go back</h1>
      </div>

      {locationExists ? (
        <div className="text-2xl font-bold">Update Existing Parking Spot</div>
      ) : (
        <div className="text-2xl font-bold">Create New Parking Spot</div>
      )}
      <EditorForm
        owner={user}
        latitude={latitude}
        longitude={longitude}
        fetchedData={locationExists}
      />
    </div>
  );
}
