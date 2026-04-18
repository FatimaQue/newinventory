export default function ProductTableSkeleton() {
   return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-2">
               <div className="h-5 w-48 rounded bg-gray-200" />
               <div className="h-3 w-64 rounded bg-gray-100" />
            </div>
            <div className="h-10 w-full md:w-72 rounded-lg bg-gray-100" />
         </div>
         <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="h-12 bg-gray-50 border-b border-gray-100" />
            {Array.from({ length: 5 }).map((_, i) => (
               <div
                  key={i}
                  className="flex items-center gap-6 px-6 py-4 border-b border-gray-50 last:border-b-0"
               >
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-100" />
                  <div className="h-4 w-16 rounded bg-gray-100" />
                  <div className="h-5 w-20 rounded-full bg-gray-100" />
                  <div className="ml-auto h-5 w-5 rounded bg-gray-100" />
               </div>
            ))}
         </div>
      </div>
   );
}
