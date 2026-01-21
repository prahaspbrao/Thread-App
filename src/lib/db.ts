import "dotenv/config";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

console.log("RUNTIME DATABASE_URL =", process.env.DATABASE_URL);
export const prismaClient = new PrismaClient({

  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
