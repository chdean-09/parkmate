import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, totalPayment } = await req.json();

    if (!userId) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ error: "Missing userId." }, { status: 401 });
    }

    if (!totalPayment) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ error: "Missing order." }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(
      { data: { userId, totalPayment } },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
