import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "zgfxgmpxofpf7i7w",
      username: "parkmate-admin",
      hashedPassword:
        "$argon2id$v=19$m=19456,t=2,p=1$tBqiVOed3pPhsoRSMRpeug$iuX8LK4TohYwZ2zoCnFR7d1IqMGP0yXmGO/qsfZujvw",
      role: "ADMIN",
      wallet: 99999,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
