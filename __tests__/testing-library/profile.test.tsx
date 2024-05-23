import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DisplayProfile from "@/components/custom/profile/displayProfile";
import { User } from "lucia";

describe("Profile", () => {
  const mockUser = {
    id: "bg5vc3hqd27xwo6x",
    username: "clyde123",
    wallet: 1339,
    role: "REGULAR",
    ownedLocations: [],
    occupiedSlots: [],
    transactions: [],
  } as User

  it("renders user info", () => {
    render(<DisplayProfile owner={mockUser} />);
    
    const userImg = screen.getByRole("img", { name: /account icons created by khulqi rosyid - flaticon/i });
    const userName = screen.getByText(mockUser.username);
    const userBalance = screen.getByText('₱1,339.00');

    expect(userImg).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userBalance).toBeInTheDocument();
  });

  it("press wallet button", () => {
    render(<DisplayProfile owner={mockUser} />);
    
    const walletLink = screen.getByRole("wallet-link");
    expect(walletLink).toBeInTheDocument();

    fireEvent.click(walletLink);

    expect(walletLink.closest('a')).toHaveAttribute('href', '/wallet'); // you cant use the window.location.pathname because we are using jsdom
  });

  it("press cash in button", () => {
    render(<DisplayProfile owner={mockUser} />);
    
    const cashInLink = screen.getByRole("cashin-link");
    expect(cashInLink).toBeInTheDocument();

    fireEvent.click(cashInLink);

    expect(cashInLink.closest('a')).toHaveAttribute('href', '/cashin');
  });
});
