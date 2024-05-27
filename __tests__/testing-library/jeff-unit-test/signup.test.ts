import { hash } from "@node-rs/argon2";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signup } from "@/lib/signup";
import prisma from "@/lib/db";

// Mocks
jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@node-rs/argon2", () => ({
  hash: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  lucia: {
    createSession: jest.fn(),
    createSessionCookie: jest.fn(() => ({
      name: "sessionCookieName",
      value: "sessionCookieValue",
      attributes: {},
    })),
  },
}));

describe("signup", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return error if username already exists", async () => {
    const formData = new FormData();
    formData.append("username", "existingUser");
    formData.append("password", "password");

    const result = await signup(formData);

    expect(result).toEqual({ error: "Username already exists" });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "existingUser" },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(lucia.createSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should return error for invalid username", async () => {
    const formData = new FormData();
    formData.append("username", "inv@lidU$ername");
    formData.append("password", "password");

    const result = await signup(formData);

    expect(result).toEqual({ error: "Invalid username" });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(lucia.createSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should return error for invalid password", async () => {
    const formData = new FormData();
    formData.append("username", "newUser");
    formData.append("password", "12345"); // Invalid password length

    const result = await signup(formData);

    expect(result).toEqual({ error: "Invalid password" });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(lucia.createSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should successfully create user and redirect to home", async () => {
    const formData = new FormData();
    formData.append("username", "newUser");
    formData.append("password", "password");

    const result = await signup(formData);

    expect(result).toEqual({ name: "redirect", value: "/home" });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "newUser" },
    });
    expect(hash).toHaveBeenCalledWith("password", expect.any(Object));
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { username: "newUser", hashedPassword: "hashedPassword" },
    });
    expect(lucia.createSession).toHaveBeenCalledWith("newUserId", {});
    expect(redirect).toHaveBeenCalledWith("/home");
  });
});
