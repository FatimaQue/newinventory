import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
   const connectionString = process.env.DATABASE_URL;
   console.log("[prisma] DATABASE_URL debug:", {
      exists: connectionString !== undefined,
      length: connectionString?.length,
      prefix: connectionString?.slice(0, 20),
      startsWithPostgres:
         connectionString?.startsWith("postgresql://") ||
         connectionString?.startsWith("postgres://"),
      hasQuotes:
         connectionString?.startsWith('"') || connectionString?.startsWith("'"),
      hasWhitespace: connectionString !== connectionString?.trim(),
   });
   if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
   }
   const adapter = new PrismaNeon({ connectionString });
   return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClientSingleton | undefined;
};

const getClient = (): PrismaClientSingleton => {
   if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = prismaClientSingleton();
   }
   return globalForPrisma.prisma;
};

export const prisma: PrismaClientSingleton = new Proxy(
   {} as PrismaClientSingleton,
   {
      get(_target, prop) {
         const client = getClient() as unknown as Record<string | symbol, unknown>;
         const value = client[prop];
         return typeof value === "function" ? (value as Function).bind(client) : value;
      },
   },
);
