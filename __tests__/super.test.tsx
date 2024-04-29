/**
 * @jest-environment node
 */

import { GET } from "@/app/api/test/[testnum]/route";

describe("tests the nextjs route handler", () => {
  it("should show the number", async () => {
    const res = await GET({ params: { testnum: 35345353 } });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.number).toBe(35345353);
    expect(body.message).toBe("Success test");
  });
});
