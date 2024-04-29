import { NextResponse } from "next/server";

export async function GET({ params }: { params: { testnum: number } }) {
  return NextResponse.json(
    {
      number: params.testnum,
      message: "Success test",
    },
    { status: 200 },
  );
}
