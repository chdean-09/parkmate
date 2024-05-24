import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CurrentBalance from "@/components/custom/wallet/currentBalance";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import mockUser from "../../../__mocks__/user";

jest.mock("./../../../src/utils/convertToPhPesoFormat", () => ({
  convertToPhPesoFormat: jest.fn(),
}));

describe("CurrentBalance Component", () => {
  const user = mockUser;

  describe("when owner is logged in", () => {
    it("renders correctly with the formatted balance", async () => {
      const formattedBalance = "₱1,339.00";
      (convertToPhPesoFormat as jest.Mock).mockReturnValue(formattedBalance);

      render(<CurrentBalance owner={user} />);

      waitFor(() => {
        expect(screen.queryByRole('heading', { level: 2, name: /Current Balance/i })).toBeInTheDocument();
        expect(screen.queryByText(formattedBalance)).toBeInTheDocument();
        expect(convertToPhPesoFormat).toHaveBeenCalledWith(user.wallet);
      })
    });
    
    it('renders zero balance when owner has no money', async () => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("₱0.00");

      render(<CurrentBalance owner={user} />);

      waitFor(() => {
        expect(screen.queryByRole('heading', { level: 2, name: /Current Balance/i })).toBeInTheDocument();
        expect(screen.queryByText("₱0.00")).toBeInTheDocument();
        expect(convertToPhPesoFormat).toHaveBeenCalledWith("₱0.00");
      })
    })
  });

  describe("when owner is undefined", () => {
    render(<CurrentBalance owner={undefined} />);

    it("renders zero balance when owner's wallet is undefined", () => {
      waitFor(() => {
        expect(screen.queryByRole('heading', { level: 2, name: /Current Balance/i })).toBeInTheDocument();
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
   
      })
    });

    it("renders correctly with the loading text", async () => {
      waitFor(() => {
        expect(screen.queryByRole('heading', { level: 2, name: /Current Balance/i })).toBeInTheDocument();
        expect(screen.queryByText("Loading...")).toBeInTheDocument();
      })

    });
  });
});
// console.log(renderedComponent.debug());
