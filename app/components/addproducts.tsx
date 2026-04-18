"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/products";

export default function AddProductPage() {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | null>(null);

   const [formData, setFormData] = useState({
      name: "",
      quantity: "",
      price: "",
      lowStock: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const payload = new FormData();
      payload.set("name", formData.name);
      payload.set("quantity", formData.quantity);
      payload.set("price", formData.price);
      payload.set("lowStock", formData.lowStock);

      startTransition(async () => {
         try {
            await createProduct(payload);
            router.push("/inventory");
         } catch (err) {
            setError(
               err instanceof Error ? err.message : "Failed to create product",
            );
         }
      });
   };

   return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-gray-900">
                  Add New Product
               </h2>
               <p className="text-gray-500 mt-2">
                  Enter the details of the new inventory item.
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                     Product Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     required
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                     placeholder="e.g. Wireless Mouse"
                     value={formData.name}
                     onChange={handleChange}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700">
                        Quantity
                     </label>
                     <input
                        type="number"
                        min="0"
                        step="1"
                        name="quantity"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="0"
                        value={formData.quantity}
                        onChange={handleChange}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700">
                        Price ($)
                     </label>
                     <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="price"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-red-600">
                     Low Stock Alert At
                  </label>
                  <input
                     type="number"
                     min="0"
                     step="1"
                     name="lowStock"
                     required
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-400 focus:border-red-500 transition"
                     placeholder="Alert when stock hits..."
                     value={formData.lowStock}
                     onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-400 italic">
                     We&apos;ll notify you when stock drops below this number.
                  </p>
               </div>

               {error && (
                  <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                     {error}
                  </div>
               )}

               <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
               >
                  {isPending ? "Creating..." : "Create Product"}
               </button>
            </form>
         </div>
      </div>
   );
}
