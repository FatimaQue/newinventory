import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import Sidebar from "../components/sidebar";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
   dateStyle: "medium",
   timeStyle: "short",
});

async function ActivityLogSection() {
   const user = await getCurrentUser();

   const logs = await prisma.activityLog.findMany({
      where: { userId: user.id },
      orderBy: { timestamp: "desc" },
      take: 100,
      include: { product: { select: { name: true, sku: true } } },
   });

   if (logs.length === 0) {
      return (
         <div className="w-full max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
            No stock activity yet. Adjust a product&apos;s quantity to see it
            here.
         </div>
      );
   }

   return (
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
         <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Activity Log</h2>
            <p className="text-sm text-gray-500">
               Recent stock changes across your inventory
            </p>
         </div>

         <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Product
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Change
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Delta
                     </th>
                     <th className="px-4 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        When
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {logs.map((log) => {
                     const delta = log.newQuantity - log.previousQuantity;
                     const isUp = delta > 0;
                     const isDown = delta < 0;
                     return (
                        <tr
                           key={log.id}
                           className="hover:bg-gray-50/50 transition-colors"
                        >
                           <td className="px-4 sm:px-6 py-4">
                              <div className="font-medium text-gray-900">
                                 {log.product.name}
                              </div>
                              {log.product.sku && (
                                 <div className="text-xs text-gray-500">
                                    {log.product.sku}
                                 </div>
                              )}
                           </td>
                           <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                              <div className="inline-flex items-center gap-2">
                                 <span className="font-semibold">
                                    {log.previousQuantity}
                                 </span>
                                 <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                                 <span className="font-semibold">
                                    {log.newQuantity}
                                 </span>
                              </div>
                           </td>
                           <td className="px-4 sm:px-6 py-4">
                              <span
                                 className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    isUp
                                       ? "bg-green-50 text-green-700"
                                       : isDown
                                         ? "bg-red-50 text-red-700"
                                         : "bg-gray-100 text-gray-600"
                                 }`}
                              >
                                 {isUp && <ArrowUp className="w-3 h-3" />}
                                 {isDown && <ArrowDown className="w-3 h-3" />}
                                 {isUp ? "+" : ""}
                                 {delta}
                              </span>
                           </td>
                           <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                              {dateFormatter.format(log.timestamp)}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default function ActivityLogPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <Sidebar />
         <main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:p-8">
            <ActivityLogSection />
         </main>
      </div>
   );
}
