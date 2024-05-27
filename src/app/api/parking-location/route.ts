import prisma from "@/lib/db";
import { ParkingSlot } from "@prisma/client";
import { User } from "lucia";

export async function POST(request: Request) {
  try {
    const res: {
      owner: User;
      ownerId: string;
      name: string;
      baseRate: number;
      hourlyRate: number;
      latitude: number;
      longitude: number;
      gridLayout: ParkingSlot[];
    } = await request.json();

    await prisma.parkingLocation.create({
      data: {
        ownerId: res.ownerId,
        name: res.name as string,
        baseRate: Number(res.baseRate),
        hourlyRate: Number(res.hourlyRate),
        latitude: Number(res.latitude),
        longitude: Number(res.longitude),
        parkingSlots: {
          createMany: {
            data: res.gridLayout,
          },
        },
      },
    });

    return Response.json(
      {
        message: `Parking Location has been created at lat: ${res.latitude} and lng: ${res.longitude}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 404 });
  }
}

export async function PUT(request: Request) {
  try {
    const res: {
      name: string;
      baseRate: number;
      hourlyRate: number;
      latitude: number;
      longitude: number;
    } = await request.json();

    await prisma.parkingLocation.updateMany({
      where: {
        latitude: Number(res.latitude),
        longitude: Number(res.longitude),
      },
      data: {
        name: res.name as string,
        baseRate: Number(res.baseRate),
        hourlyRate: Number(res.hourlyRate),
      },
    });

    return Response.json(
      {
        message: `Parking Location has been updated at base: ${res.baseRate} and hourly: ${res.hourlyRate}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  try {
    const res: {
      latitude: number;
      longitude: number;
    } = await request.json();

    const { count } = await prisma.parkingLocation.deleteMany({
      where: {
        latitude: res.latitude,
        longitude: res.longitude,
      },
    });

    return Response.json(
      {
        message: `Parking Location has been deleted at lat: ${res.latitude} and lng: ${res.longitude}`,
        count: count,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 410 });
  }
}
