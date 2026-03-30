import { PrismaClient } from '.prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Correctly typing the global object for Prisma 7
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma