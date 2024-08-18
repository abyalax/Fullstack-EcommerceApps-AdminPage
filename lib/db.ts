import { PrismaClient } from "@prisma/client";

/**
 * @instance Prisma Client 
 * @see https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
 */

declare  global {
    var prisma: PrismaClient | undefined
}

const db = global.globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db