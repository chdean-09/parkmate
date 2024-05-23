import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Reserve({
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

  if (!locationExists) {
    return redirect("/home");
  }

  return <div>{locationExists.name}</div>;
}
