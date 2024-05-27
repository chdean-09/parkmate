/**
 * @jest-environment node
 */

import { PUT } from "@/app/api/parking-location/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("API testing for updating a parking location", () => {
  beforeAll(async () => {
    const testUser = await prisma.user.create({
      data: {
        id: "testingtestinghi",
        hashedPassword: "passwordnahashed123",
        username: "testONLYhaaaa",
        wallet: 999,
      },
    });

    const location = await prisma.parkingLocation.create({
      data: {
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 100,
        hourlyRate: 50,
        latitude: 10.4123,
        longitude: 10.5123,
      },
    });
  });

  afterAll(async () => {
    // Delete the parking location
    await prisma.parkingLocation.deleteMany({
      where: {
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 1000,
        hourlyRate: 500,
        latitude: 10.4123,
        longitude: 10.5123,
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

  it("updates a parking location", async () => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 1000,
        hourlyRate: 500,
        latitude: 10.4123,
        longitude: 10.5123,
      }),
    } as any;

    const response = await PUT(request);
    const { message } = await response.json();

    const location = await prisma.parkingLocation.findFirst({
      where: {
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 1000,
        hourlyRate: 500,
        latitude: 10.4123,
        longitude: 10.5123,
      },
    });

    expect(location!.baseRate).toBe(1000);
    expect(location!.hourlyRate).toBe(500);
    expect(message).toEqual(
      "Parking Location has been updated at base: 1000 and hourly: 500",
    );
  });
});
