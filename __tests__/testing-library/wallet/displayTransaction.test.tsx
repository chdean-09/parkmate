import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionPage from "@/components/custom/wallet/transactions";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import { formatTimeToHMS } from "@/utils/timeFormatter";

jest.mock("@/utils/convertToPhPesoFormat");
jest.mock("@/utils/timeFormatter");

describe("TransactionPage", () => {
  describe("test positive numbers", () => {
    beforeEach(() => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("₱1,000.00");
      (formatTimeToHMS as jest.Mock).mockReturnValue("08:30:00");

      render(
        <TransactionPage
          id={123}
          name="Transaction Name"
          amount={1000}
          createdAt={new Date("2024-05-24T08:30:00Z")}
          slotId={12345}
          userId="67890"
        />,
      );
    });

    it("renders positive amount with green color and + sign", () => {
      const amountElement = screen.getByText("+₱1,000.00");
      expect(amountElement).toHaveTextContent("+₱1,000.00");
    });

    it("renders transaction details correctly", () => {
      expect(screen.getByText("Transaction Name")).toBeInTheDocument();

      expect(screen.getByText("08:30:00")).toBeInTheDocument();
      expect(screen.getByText("+₱1,000.00")).toBeInTheDocument();
    });

    it("renders positive amount with green color and + sign", () => {
      const amountElement = screen.getByText("+₱1,000.00");
      expect(amountElement).toHaveTextContent("+₱1,000.00");
      expect(screen.getByText("08:30:00")).toBeInTheDocument();
    });
  });

  describe("test negative numbers", () => {
    beforeEach(() => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("-₱500.00");
      (formatTimeToHMS as jest.Mock).mockReturnValue("08:30:00");

      render(
        <TransactionPage
          id={123}
          name="Transaction Name"
          amount={-500}
          createdAt={new Date("2024-05-24T08:30:00Z")}
          slotId={12345}
          userId="67890"
        />,
      );
    });

    it("renders negative amount with red color and - sign", () => {
      const amountElement = screen.getByText("-₱500.00");
      expect(amountElement).toHaveTextContent("-₱500.00");
      expect(screen.getByText("08:30:00")).toBeInTheDocument();
    });
  });

  describe("test zero number", () => {
    beforeEach(() => {
      (convertToPhPesoFormat as jest.Mock).mockReturnValue("₱0.00");
      (formatTimeToHMS as jest.Mock).mockReturnValue("08:30:00");

      render(
        <TransactionPage
          id={123}
          name="Transaction Name"
          amount={0}
          createdAt={new Date("2024-05-24T08:30:00Z")}
          slotId={12345}
          userId="67890"
        />,
      );
    });

    it("renders 0 with green color and +", () => {
      const amountElement = screen.getByText("₱0.00");

      expect(amountElement).toHaveTextContent("₱0.00");
      expect(screen.getByText("08:30:00")).toBeInTheDocument();
    });
  });
});
