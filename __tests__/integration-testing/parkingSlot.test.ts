/**
 * @jest-environment node
 */

import { POST } from "@/app/api/slot/reserve/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("API testing for reserving the parking slot", () => {
  let uniqueId: number;
  let slotId: string;
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

    const testLocation = await prisma.parkingLocation.create({
      data: {
        baseRate: 100,
        name: "Test Location API wow",
        hourlyRate: 50,
        latitude: 10.1123,
        longitude: 10.1123,
        createdAt: new Date("May 27, 2021 03:24:00"),
        ownerId: testUser.id,
      },
    });

    locationId = testLocation.id;

    const slot = await prisma.parkingSlot.create({
      data: {
        content: "This is a test content",
        id: "6",
        x: 0,
        y: 0,
        locationId: testLocation.id,
      },
    });

    uniqueId = slot.unique_id;
    slotId = slot.id;
  });

  afterAll(async () => {
    await prisma.parkingSlot.delete({
      where: {
        unique_id: uniqueId,
      },
    });

    // Delete the parking location
    await prisma.parkingLocation.delete({
      where: {
        id: locationId,
      },
    });

    // Delete transactions associated with the slot reservation
    await prisma.transaction.deleteMany({
      where: {
        name: `Reserve slot #${slotId} at Test Location API wow`,
        amount: -100,
        userId: "testingtestinghi",
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

  it("reserves the user's parking slot", async () => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        uniqueId: uniqueId,
        name: "Test Location API wow",
        baseRate: 100,
        user: {
          id: "testingtestinghi",
          hashedPassword: "passwordnahashed123",
          username: "testONLYhaaaa",
          wallet: 999,
        },
      }),
    } as any;

    const response = await POST(request);
    const { message } = await response.json();

    const slotOccupied = await prisma.parkingSlot.findFirst({
      where: {
        content: "This is a test content",
        id: "6",
        x: 0,
        y: 0,
        locationId: locationId,
      },
    });

    expect(slotOccupied!.occupied).toEqual(true);
    expect(message).toEqual("Reserved Slot #6 at Test Location API wow");
  });

  it("fails to reserve the user's parking slot", async () => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        uniqueId: uniqueId,
        name: "Test Location API",
        baseRate: 100,
      }),
    } as any;

    const response = await POST(request);

    expect(response.status).toEqual(404);
  });
});
