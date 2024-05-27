import { cashIn } from "@/actions/cashInSubmit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (!amount || Number(amount) < 0 || Number(amount) > 100000) {
      return NextResponse.json(
        {
          message: "Invalid amount. Amount must be between 0 and 100,000.",
        },
        { status: 400 }
      );
    }

    const res = await cashIn(amount, userId);

    return NextResponse.json({ success: res.success }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the wallet" },
      { status: 500 }
    );
  }
}
