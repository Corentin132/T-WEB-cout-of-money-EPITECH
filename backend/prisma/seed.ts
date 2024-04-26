import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /**
   * User addition starts here.
   */
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      username: "Alice",
      password: "password",
      role: "user",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      username: "Bob",
      password: "password",
      role: "user",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@prisma.io" },
    update: {},
    create: {
      email: "admin@prisma.io",
      username: "Admin",
      password: "password",
      role: "admin",
    },
  });

  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@prisma.io" },
    update: {},
    create: {
      email: "superadmin@prisma.io",
      username: "Superadmin",
      password: "password",
      role: "superadmin",
    },
  });

  /**
   * CryptoCurrency addition starts here.
   */
  const btcEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "BTCEUR" },
    update: {},
    create: {
      symbol: "BTCEUR",
      is_default: true,
      is_favorite: true,
    },
  });

  const ethEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "ETHEUR" },
    update: {},
    create: {
      symbol: "ETHEUR",
      is_default: true,
      is_favorite: false,
    },
  });

  const solEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "SOLEUR" },
    update: {},
    create: {
      symbol: "SOLEUR",
      is_default: true,
      is_favorite: true,
    },
  });

  const bnbEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "BNBEUR" },
    update: {},
    create: {
      symbol: "BNBEUR",
      is_default: false,
      is_favorite: true,
    },
  });

  const xrpEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "XRPEUR" },
    update: {},
    create: {
      symbol: "XRPEUR",
      is_default: false,
      is_favorite: true,
    },
  });

  const stethEur = await prisma.cryptoCurrency.upsert({
    where: { symbol: "STETHEUR" },
    update: {},
    create: {
      symbol: "STETHEUR",
      is_default: true,
      is_favorite: false,
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
