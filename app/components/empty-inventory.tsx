import Link from "next/link";
import { PackageOpen, Plus } from "lucide-react";

export default function EmptyInventory() {
   return (
      <div className="w-full max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-sm border border-gray-100">
         <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-6">
               <PackageOpen className="w-10 h-10 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
               No products yet
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
               Your inventory is empty. Add your first product to start tracking
               stock, prices, and low-stock alerts.
            </p>
            <Link
               href="/add-product"
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
               <Plus className="w-4 h-4" />
               Add your first product
            </Link>
         </div>
      </div>
   );
}
