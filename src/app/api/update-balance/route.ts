import { leaveSlot } from "@/actions/reserveSlot";
import prisma from "@/lib/db";
import { isPastAnHour } from "@/utils/isPastAnHour";

export async function POST(request: Request) {
  // time is in milliseconds
  const currentTime = new Date().getTime();

  // gets all slots currently occupied
  const occupiedSlots = await prisma.parkingSlot.findMany({
    include: {
      location: true,
    },
    where: {
      occupied: true,
    },
  });

  occupiedSlots.forEach(async (data) => {
    // within the occupied slots, this gets the latest transaction by the user in this slot
    const latestTransactions = await prisma.transaction.findFirst({
      include: {
        user: true,
      },
      where: {
        slotId: data.unique_id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // gets the time diff and checks if it has been an hour since.
    const timeDifference =
      currentTime - latestTransactions!.createdAt.getTime();

    if (isPastAnHour(timeDifference)) {
      if (latestTransactions!.user.wallet < data.location.hourlyRate) {
        // kulang kwarta sang user so he is evicted!
        await leaveSlot({ id: data.id }, data.locationId);

        return Response.json({
          message: `${latestTransactions!.user.username} has been evicted from ${data.location.name}, slot ${data.id}.`,
        });
      } else {
        // user has enough balance
        // creates a new transaction for this hourly deduction
        await prisma.transaction.create({
          data: {
            name: `Hourly rate for slot #${data.id} at ${data.location.name}`,
            amount: -data.location.hourlyRate,
            userId: latestTransactions!.userId,
            slotId: data.unique_id,
          },
        });

        // decrement user wallet
        await prisma.user.update({
          where: {
            id: latestTransactions!.userId,
          },
          data: {
            wallet: {
              decrement: data.location.hourlyRate,
            },
          },
        });

        return Response.json({
          message: `${latestTransactions!.user.username} has paid the hourly rate from ${data.location.name}, slot ${data.id}.`,
        });
      }
    }
  });

  return Response.json({ message: "OK" });
}
