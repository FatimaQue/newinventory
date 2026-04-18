"use client";

import { useMemo, useState, useTransition } from "react";
import {
   ChevronLeft,
   ChevronRight,
   Minus,
   Plus,
   Search,
   Trash2,
} from "lucide-react";
import { deleteProduct, updateProductQuantity } from "@/app/actions/products";
import type { SerializedProduct } from "@/app/inventory/page";

const ITEMS_PER_PAGE = 5;

const currency = new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
});

function statusFor(product: SerializedProduct) {
   if (product.quantity <= 0) return "Out of Stock";
   if (product.lowStock != null && product.quantity <= product.lowStock)
      return "Low Stock";
   return "In Stock";
}

function statusClass(status: string) {
   if (status === "In Stock") return "bg-green-50 text-green-700";
   if (status === "Low Stock") return "bg-yellow-50 text-yellow-700";
   return "bg-red-50 text-red-700";
}

export default function ProductTable({
   products,
}: {
   products: SerializedProduct[];
}) {
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [pendingId, setPendingId] = useState<string | null>(null);
   const [, startTransition] = useTransition();

   const filtered = useMemo(() => {
      const q = searchTerm.toLowerCase();
      return products.filter(
         (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.sku ?? "").toLowerCase().includes(q),
      );
   }, [products, searchTerm]);

   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
   const safePage = Math.min(currentPage, totalPages);
   const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
   const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

   const runAction = (id: string, fn: () => Promise<void>) => {
      setPendingId(id);
      startTransition(async () => {
         try {
            await fn();
         } finally {
            setPendingId((cur) => (cur === id ? null : cur));
         }
      });
   };

   return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
               <h2 className="text-xl font-bold text-gray-900">
                  Product Inventory
               </h2>
               <p className="text-sm text-gray-500">
                  Manage and track your store products
               </p>
            </div>

            <div className="relative w-full md:w-72">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => {
                     setSearchTerm(e.target.value);
                     setCurrentPage(1);
                  }}
               />
            </div>
         </div>

         <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Product
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        SKU
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Price
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Quantity
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {paginated.length > 0 ? (
                     paginated.map((product) => {
                        const status = statusFor(product);
                        const isPending = pendingId === product.id;
                        return (
                           <tr
                              key={product.id}
                              className={`hover:bg-gray-50/50 transition-colors ${
                                 isPending ? "opacity-50" : ""
                              }`}
                           >
                              <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                                 {product.name}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                                 {product.sku ?? "—"}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-900">
                                 {currency.format(product.price)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                                 <div className="inline-flex items-center gap-1">
                                    <button
                                       disabled={
                                          isPending || product.quantity <= 0
                                       }
                                       onClick={() =>
                                          runAction(product.id, () =>
                                             updateProductQuantity(
                                                product.id,
                                                -1,
                                             ),
                                          )
                                       }
                                       className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                       aria-label="Decrease quantity"
                                    >
                                       <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="min-w-8 text-center font-semibold">
                                       {product.quantity}
                                    </span>
                                    <button
                                       disabled={isPending}
                                       onClick={() =>
                                          runAction(product.id, () =>
                                             updateProductQuantity(
                                                product.id,
                                                1,
                                             ),
                                          )
                                       }
                                       className="p-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                       aria-label="Increase quantity"
                                    >
                                       <Plus className="w-3.5 h-3.5" />
                                    </button>
                                 </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                 <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass(status)}`}
                                 >
                                    {status}
                                 </span>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-right">
                                 <button
                                    disabled={isPending}
                                    onClick={() =>
                                       runAction(product.id, () =>
                                          deleteProduct(product.id),
                                       )
                                    }
                                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                                    aria-label="Delete product"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </td>
                           </tr>
                        );
                     })
                  ) : (
                     <tr>
                        <td
                           colSpan={6}
                           className="px-6 py-10 text-center text-gray-500 italic"
                        >
                           No products found matching &quot;{searchTerm}&quot;
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         <div className="flex items-center justify-between mt-6 px-2 gap-4 flex-wrap">
            <p className="text-sm text-gray-500">
               Showing{" "}
               <span className="font-semibold text-gray-900">
                  {filtered.length === 0 ? 0 : startIndex + 1}
               </span>{" "}
               to{" "}
               <span className="font-semibold text-gray-900">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
               </span>{" "}
               of{" "}
               <span className="font-semibold text-gray-900">
                  {filtered.length}
               </span>{" "}
               results
            </p>

            <div className="flex items-center space-x-2">
               <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={safePage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronLeft className="w-5 h-5" />
               </button>

               <div className="hidden sm:flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                           safePage === i + 1
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
                        }`}
                     >
                        {i + 1}
                     </button>
                  ))}
               </div>

               <button
                  onClick={() =>
                     setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={safePage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         </div>
      </div>
   );
}
