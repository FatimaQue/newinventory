import { PrismaClient } from '@prisma/client';

// 1. Manually inject the variable into the global process object 
// BEFORE calling the Prisma constructor.
const DB_URL = "postgresql://neondb_owner:npg_XALRz2ueoSZ0@ep-frosty-shadow-amnjwupc-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require";
process.env.DATABASE_URL = DB_URL;

// 2. Now Prisma will see the variable we just forced into memory
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 1. Force-injected DB_URL into process.env");
  
  const demoUserId = "1bc044be-3f80-4e3f-8bd6-a4140ff2b1e9";
  
  console.log("📦 2. Preparing 25 products...");
  const products = Array.from({ length: 25 }).map((_, i) => ({
    userId: demoUserId,
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
    quantity: Math.floor(Math.random() * 20),
    lowStock: 5, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
  }));

  try {
    console.log("📡 3. Attempting insertion...");
    const result = await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log(`✅4. SUCCESS! Inserted ${result.count} rows.`);
  } catch (error) {
    console.error(" 4. DATABASE ERROR:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🏁 5. Done.");
  }
}

main().catch((err) => {
  console.error("💥 FATAL ERROR:", err);
  process.exit(1);
});