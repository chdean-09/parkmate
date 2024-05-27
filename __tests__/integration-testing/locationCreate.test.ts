/**
 * @jest-environment node
 */

import { POST } from "@/app/api/parking-location/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("API testing for creating a parking location", () => {
  beforeAll(async () => {
    const testUser = await prisma.user.create({
      data: {
        id: "testingtestinghi",
        hashedPassword: "passwordnahashed123",
        username: "testONLYhaaaa",
        wallet: 999,
      },
    });
  });

  afterAll(async () => {
    // Delete the parking location
    await prisma.parkingLocation.deleteMany({
      where: {
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 100,
        hourlyRate: 50,
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

  it("creates a parking location", async () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 100,
        hourlyRate: 50,
        latitude: 10.4123,
        longitude: 10.5123,
        gridLayout: [
          {
            content: "This is a test content",
            id: "1",
            x: 20,
            y: 10,
          },
        ],
      }),
    } as any;

    const response = await POST(request);
    const { message } = await response.json();

    const location = await prisma.parkingLocation.findFirst({
      where: {
        name: "Test Location API",
        baseRate: 100,
        hourlyRate: 50,
        latitude: 10.4123,
        longitude: 10.5123,
        ownerId: "testingtestinghi",
      },
    });

    expect(location).toBeTruthy();
    expect(message).toEqual(
      "Parking Location has been created at lat: 10.4123 and lng: 10.5123",
    );
  });

  it("fails to create a parking location", async () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      json: async () => ({
        ownerId: "testingtestinghi",
        name: "Test Location API",
        baseRate: 100,
        longitude: 10.5123,
      }),
    } as any;

    const response = await POST(request);

    expect(response.status).toEqual(404);
  });
});
