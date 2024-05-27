import prisma from "@/lib/db";
import { User } from "lucia";

export async function POST(request: Request) {
  try {
    const res: {
      uniqueId: number;
      name: string;
      baseRate: number;
      user: User;
    } = await request.json();

    const reservedSlot = await prisma.parkingSlot.update({
      where: {
        unique_id: res.uniqueId,
      },
      data: {
        occupiedAt: new Date(),
        occupied: true,
        userId: res.user.id,
      },
    });

    // creates a transaction for history keeping
    await prisma.transaction.create({
      data: {
        name: `Reserve slot #${reservedSlot.id} at ${res.name}`,
        amount: -res.baseRate,
        userId: res.user.id,
        slotId: res.uniqueId,
      },
    });

    // updates user wallet amount
    await prisma.user.update({
      where: {
        id: res.user.id,
      },
      data: {
        wallet: {
          decrement: res.baseRate,
        },
      },
    });

    return Response.json(
      { message: `Reserved Slot #${reservedSlot.id} at ${res.name}` },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 404 });
  }
}
