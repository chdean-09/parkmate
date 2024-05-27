import prisma from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { login } from "./login";

export async function signup(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  // username must be between 3 ~ 31 characters, and only consists of letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive

  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
  });

  if (user) {
    console.log("User already exists");

    try {
      await login(formData);
    } catch (error) {
      console.log("Error logging in user: ", error);
    }

    return {
      error: "Username already exists",
    };
  }

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-zA-Z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  await prisma.user.create({
    data: {
      id: userId,
      username: username,
      hashedPassword: passwordHash,
    },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/home");
}
