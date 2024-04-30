import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RandomTest from "@/components/custom/jest-test";

describe("Page", () => {
  it("renders a heading", async () => {
    render(<RandomTest />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
