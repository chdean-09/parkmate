import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import CurrentBalance from "@/components/custom/wallet/currentBalance";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import mockUser from "../../../__mocks__/user";

jest.mock("./../../../src/utils/convertToPhPesoFormat", () => ({
  convertToPhPesoFormat: jest.fn(),
}));

describe("CurrentBalance Component", () => {
  const user = mockUser;

  describe("when the owner is logged in", () => {
    it("renders correctly with the formatted balance", async () => {
      const formattedBalance = "₱1,339.00";
      (convertToPhPesoFormat as jest.Mock).mockReturnValue(formattedBalance);
      render(<CurrentBalance owner={user} />);

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 2, name: /Current Balance/i }),
        ).toBeInTheDocument();
        expect(screen.getByText(formattedBalance)).toBeInTheDocument();
        expect(convertToPhPesoFormat).toHaveBeenCalledWith(user.wallet);
      });
    });

    it("renders zero balance when the owner has no money", async () => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("₱0.00");
      render(<CurrentBalance owner={user} />);

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 2, name: /Current Balance/i }),
        ).toBeInTheDocument();
        expect(screen.getByText("₱0.00")).toBeInTheDocument();
        expect(convertToPhPesoFormat).toHaveBeenCalledWith("₱0.00");
      });
    });
  });

  describe("when the owner is undefined", () => {
    it("renders the loading text when the owner's wallet is undefined", async () => {
      render(<CurrentBalance owner={undefined} />);

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 2, name: /Current Balance/i }),
        ).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });

    it("renders the loading text correctly", async () => {
      render(<CurrentBalance owner={undefined} />);

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { level: 2, name: /Current Balance/i }),
        ).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });
});

// console.log(renderedComponent.debug());
