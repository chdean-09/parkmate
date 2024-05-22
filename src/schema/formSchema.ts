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

export const parkingFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(31, { message: "Name character limit is 31" }),
  baseRate: z.coerce.number(),
  hourlyRate: z.coerce.number(),
  gridLayout: z.array(
    z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
      content: z.string(),
      id: z.string(),
    })
  ),
});

export const cashInFormSchema = z.object({
  amount: z.coerce
    .number()
    .positive()
    .max(100000, { message: "Max cash in amount is ₱ 100000" }),
});
