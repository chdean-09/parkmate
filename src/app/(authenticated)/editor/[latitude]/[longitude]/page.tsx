import EditorForm from "@/components/custom/editorForm";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { GridStackWidget } from "gridstack";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Editor({
  params,
}: {
  params: { latitude: number; longitude: number };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
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

  return (
    <div className="h-screen flex flex-col items-center">
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
