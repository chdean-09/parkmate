/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "@/app/api/test/[testnum]/route";

describe("tests the nextjs route handler", () => {
  it("should show the number", async () => {
    await testApiHandler({
      params: { testnum: "534543" },
      appHandler,
      async test({ fetch }) {
        const response = await fetch({ method: "GET" });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.number).toBe("534543");
        expect(data.message).toBe("Success test");
      },
    });
  });
});
