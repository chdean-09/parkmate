import React from 'react'
import DisplayProfile from "@/components/custom/profile/displayProfile";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { validateRequest } from "@/lib/auth";

const { user } = await validateRequest();



describe("Page", () => {
  it("renders a heading", async () => {
    render(<DisplayProfile owner={user}/>);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
