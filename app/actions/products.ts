"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProductQuantity(id: string, delta: number) {
   const user = await getCurrentUser();

   const existing = await prisma.product.findFirst({
      where: { id, userId: user.id },
      select: { id: true, quantity: true },
   });
   if (!existing) throw new Error("Product not found");

   const nextQuantity = Math.max(0, existing.quantity + delta);

   await prisma.$transaction([
      prisma.product.update({
         where: { id },
         data: { quantity: nextQuantity },
      }),
      prisma.activityLog.create({
         data: {
            productId: id,
            userId: user.id,
            previousQuantity: existing.quantity,
            newQuantity: nextQuantity,
         },
      }),
   ]);

   revalidatePath("/inventory");
   revalidatePath("/dashboard");
   revalidatePath("/activity-log");
}

export async function deleteProduct(id: string) {
   const user = await getCurrentUser();

   const existing = await prisma.product.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
   });
   if (!existing) throw new Error("Product not found");

   await prisma.product.delete({ where: { id } });

   revalidatePath("/inventory");
   revalidatePath("/dashboard");
}

export async function createProduct(formData: FormData) {
   const user = await getCurrentUser();

   const name = String(formData.get("name") ?? "").trim();
   const sku = String(formData.get("sku") ?? "").trim() || null;
   const price = Number(formData.get("price") ?? 0);
   const quantity = Number(formData.get("quantity") ?? 0);
   const lowStockRaw = formData.get("lowStock");
   const lowStock =
      lowStockRaw === null || lowStockRaw === "" ? null : Number(lowStockRaw);

   if (!name) throw new Error("Name is required");
   if (!Number.isFinite(price) || price < 0) throw new Error("Invalid price");
   if (!Number.isInteger(quantity) || quantity < 0)
      throw new Error("Invalid quantity");

   await prisma.product.create({
      data: {
         userId: user.id,
         name,
         sku,
         price,
         quantity,
         lowStock,
      },
   });

   revalidatePath("/inventory");
   revalidatePath("/dashboard");
}
