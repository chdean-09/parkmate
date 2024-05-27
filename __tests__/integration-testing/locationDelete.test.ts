/**
 * @jest-environment node
 */

import { DELETE } from "@/app/api/parking-location/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("API testing for deleting a parking location", () => {
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
    // Delete the test user
    await prisma.user.delete({
      where: {
        id: "testingtestinghi",
      },
    });

    // Disconnect from the database
    await prisma.$disconnect();
  });

  it("deletes a parking location", async () => {
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        latitude: 10.4123,
        longitude: 10.5123,
      }),
    } as any;

    const response = await DELETE(request);
    const { message } = await response.json();

    const location = await prisma.parkingLocation.findFirst({
      where: {
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 100,
        hourlyRate: 50,
        latitude: 10.4123,
        longitude: 10.5123,
      },
    });

    expect(location).toBeNull();
    expect(message).toEqual(
      "Parking Location has been deleted at lat: 10.4123 and lng: 10.5123",
    );
  });

  it("fails to delete a parking location", async () => {
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({}),
    } as any;

    const response = await DELETE(request);
    const result = await response.json();

    expect(result.count).toBe(0);
  });
});
