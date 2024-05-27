/**
 * @jest-environment node
 */

import { POST } from "@/app/api/slot/leave/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("API testing for leaving the parking slot", () => {
  let slotId: string = "78";
  let locationId: number;

  beforeAll(async () => {
    const testUser = await prisma.user.create({
      data: {
        id: "testingtestinghi",
        hashedPassword: "passwordnahashed123",
        username: "testONLYhaaaa",
        wallet: 999,
      },
    });

    const newLocation = await prisma.parkingLocation.create({
      data: {
        baseRate: 100,
        name: "YOU ARE EVICTED FROM THIS SLOT",
        hourlyRate: 50,
        latitude: 10.1423,
        longitude: 10.1723,
        createdAt: new Date("May 27, 2021 03:24:00"),
        ownerId: "testingtestinghi",
        parkingSlots: {
          create: {
            content: "This is a test content",
            id: slotId,
            x: 0,
            y: 0,
          },
        },
      },
    });

    locationId = newLocation.id;
  });

  afterAll(async () => {
    // Delete the parking location
    await prisma.parkingLocation.delete({
      where: {
        id: locationId,
      },
    });

    // Delete the test user
    await prisma.user.delete({
      where: {
        id: "testingtestinghi",
      },
    });

    // Disconnect from the database
    await prisma.$disconnect();
  });

  it("removes the user from the parking slot", async () => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        slot: {
          id: "78",
        },
        locationId: locationId,
      }),
    } as any;

    const response = await POST(request);
    const { message } = await response.json();

    const slotLeft = await prisma.parkingSlot.findFirst({
      where: {
        content: "This is a test content",
        id: "78",
        x: 0,
        y: 0,
        locationId: locationId,
      },
    });

    expect(slotLeft!.occupied).toEqual(false);
    expect(message).toEqual("Left slot #78");
  });

  it("fails to reserve the user's parking slot", async () => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        name: "Test Location API",
        baseRate: 100,
      }),
    } as any;

    const response = await POST(request);

    expect(response.status).toEqual(404);
  });
});
