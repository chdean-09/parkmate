import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LogInForm from "@/components/custom/loginForm";

describe("LogInForm", () => {
  const mockLogin = jest.fn((formData: FormData) => Promise.resolve({ success: true }) as unknown as Promise<ActionResult | void>);
  const formData = new FormData();
  formData.append("username", "test-username");
  formData.append("password", "test-password");

  it("calls the login function on submit", async () => {
    render(<LogInForm login={mockLogin} />);
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "test-username" } });
    fireEvent.change(passwordInput, { target: { value: "test-password" } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    expect(mockLogin).toHaveBeenCalledWith(formData);
  });

  it("displays an error message on invalid username on login", async () => {
    const mockLoginWithError = jest.fn(() =>
      Promise.resolve({ error: "Invalid username" })
    );
    render(<LogInForm login={mockLoginWithError} />);
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "test-username-wrong" } });
    fireEvent.change(passwordInput, { target: { value: "test-password" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText("Invalid username")).toBeInTheDocument()
    );
  });

  it("displays an error message on invalid password on login", async () => {
    const mockLoginWithError = jest.fn(() =>
      Promise.resolve({ error: "Invalid password" })
    );
    render(<LogInForm login={mockLoginWithError} />);
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "test-username" } });
    fireEvent.change(passwordInput, { target: { value: "test-password-wrong" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText("Invalid password")).toBeInTheDocument()
    );
  });


  it("displays an error message on invalid password on login", async () => {
    const mockLoginWithError = jest.fn(() =>
      Promise.resolve({ error: "Incorrect username or password" })
    );
    render(<LogInForm login={mockLoginWithError} />);
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "test-username-wrong" } });
    fireEvent.change(passwordInput, { target: { value: "test-password-wrong" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText("Incorrect username or password")).toBeInTheDocument()
    );
  });

  
  
});
