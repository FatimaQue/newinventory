import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // In Prisma 7, keep this empty. 
  // The client uses the config from prisma.config.ts by default.
  return new PrismaClient({
    // @ts-ignore - Temporary fix for Prisma 7 type mismatch
    datasourceUrl: process.env.DATABASE_URL 
  } as any)
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma