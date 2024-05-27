import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import DisplayProfile from "@/components/custom/profile/displayProfile";
import { User } from "lucia";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import mockUser from "../../../__mocks__/user";
// import { useRouter } from "next/router"; // next/link uses next/router internally
import userEvent from "@testing-library/user-event";

// Mock the Router.push function implementation doesnt work yet, we are using next/link so it different than the next/navigation
// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

jest.mock("./../../../src/utils/convertToPhPesoFormat", () => ({
  convertToPhPesoFormat: jest.fn(),
}));

describe("DisplayProfile", () => {
  const user: User = mockUser;

  describe("User is Logged In", () => {
    it("renders user info with correct values", () => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("₱1,339.00");

      render(<DisplayProfile owner={user} />);

      const occupiedSlotsEl = screen.getByText("0");
      const usernameElement = screen.getByText(user.username);
      const balanceElement = screen.getByText("₱1,339.00");

      expect(occupiedSlotsEl).toBeInTheDocument();
      expect(usernameElement).toBeInTheDocument();
      expect(balanceElement).toBeInTheDocument();
    });

    describe("Clicking on View Owned Slot Button", () => {
      const user: User = mockUser;

      it("navigates to /reserved-spot", async () => {
        //see comments above
        // const mockRouter = {
        //   push: jest.fn(),
        // };

        render(<DisplayProfile owner={user} />);

        const viewSlotButton = screen.getByRole("view-slot-link");
        expect(viewSlotButton).toHaveAttribute("href", "/reserved-spot");

        viewSlotButton.click();
      });

      it("navigates to /wallet when link is clicked", async () => {
        render(<DisplayProfile owner={user} />);

        const viewSlotButton = screen.getByRole("wallet-link");
        expect(viewSlotButton).toHaveAttribute("href", "/wallet");

        userEvent.click(viewSlotButton);
      });

      it("navigates to /cashin when link is clicked", async () => {
        render(<DisplayProfile owner={user} />);

        const cashinButton = screen.getByRole("cashin-link");
        expect(cashinButton).toHaveAttribute("href", "/cashin");

        userEvent.click(cashinButton);
      });
    });
  });

  describe("User is not Logged In", () => {
    it("renders loading text when owner is undefined", () => {
      render(<DisplayProfile owner={undefined} />);

      const loadingTextElement = screen.getByText("Loading...");

      expect(loadingTextElement).toBeInTheDocument();
    });
  });
});
