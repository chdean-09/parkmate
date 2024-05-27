import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const res: {
      slot: { id: string };
      locationId: number;
    } = await request.json();

    await prisma.parkingSlot.updateMany({
      data: {
        occupiedAt: null,
        occupied: false,
        userId: null,
      },
      where: {
        AND: [
          {
            id: res.slot.id,
          },
          {
            locationId: res.locationId,
          },
        ],
      },
    });

    return Response.json(
      { message: `Left slot #${res.slot.id}` },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: `${error}` }, { status: 404 });
  }
}
