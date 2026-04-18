"use client";

import { useEffect } from "react";

export default function Error({
   error,
   unstable_retry,
}: {
   error: Error & { digest?: string };
   unstable_retry: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
         <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
               Something went wrong
            </h2>
            <p className="text-sm text-gray-500 mb-4">
               We couldn&apos;t load this section. Please try again.
            </p>
            {error.digest && (
               <p className="text-xs text-gray-400 mb-4 font-mono break-all">
                  digest: {error.digest}
               </p>
            )}
            <button
               type="button"
               onClick={() => unstable_retry()}
               className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            >
               Try again
            </button>
         </div>
      </div>
   );
}
