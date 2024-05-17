// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { testnum: number } },
// ) {
//   return NextResponse.json(
//     {
//       number: params.testnum,
//       message: "Success test",
//     },
//     { status: 200 },
//   );
// }

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { testnum: number } },
) {
  // Function to add a delay
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Wait for 1 second (1000 milliseconds)
  await wait(3000);

  return NextResponse.json(
    {
      number: params.testnum,
      message: "Success test",
    },
    { status: 200 },
  );
}
