import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { testnum: number } },
) {
  return NextResponse.json(
    {
      location: "Latitude, Longitude",
      city: "Your City",
      parkingSpotName: "W Car Park",
      number: params.testnum,
      message: "Success test",
    },
    { status: 200 },
  );
}
