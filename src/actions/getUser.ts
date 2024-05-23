import prisma from "@/lib/db";
import { User } from "lucia";

export async function getUser(owner: User) {
  const user = await prisma.user.findUnique({
    where: {
      id: owner.id,
    },
  })

  if (!user) return null

  let userInfo = {
    id: user.id as string,
    username: user.username as string,
    wallet: user.wallet as number,
    role: user.role,
  }

  return userInfo
}