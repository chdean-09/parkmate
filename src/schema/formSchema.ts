"use client";

import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(31, { message: "Username character limit is 31" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password character limit is 255" }),
});
