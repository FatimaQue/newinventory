import { Suspense } from "react";
import Sidebar from "../components/sidebar";
import ProductTable from "../components/inventory-details";
import ProductTableSkeleton from "../components/inventory-skeleton";
import EmptyInventory from "../components/empty-inventory";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { Product } from "@prisma/client";

export type SerializedProduct = Omit<
   Product,
   "price" | "createdAt" | "UpdatedAt"
> & {
   price: number;
   createdAt: string;
   UpdatedAt: string;
};

async function ProductsSection() {
   const user = await getCurrentUser();

   const products = await prisma.product.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
   });

   if (products.length === 0) {
      return <EmptyInventory />;
   }

   const serialized: SerializedProduct[] = products.map((p) => ({
      ...p,
      price: Number(p.price),
      createdAt: p.createdAt.toISOString(),
      UpdatedAt: p.UpdatedAt.toISOString(),
   }));

   return <ProductTable products={serialized} />;
}

export default function InventoryPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Sidebar />
         <main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:p-8">
            <Suspense fallback={<ProductTableSkeleton />}>
               <ProductsSection />
            </Suspense>
         </main>
      </div>
   );
}
