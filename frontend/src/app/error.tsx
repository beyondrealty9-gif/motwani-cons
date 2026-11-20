"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught error in App ErrorBoundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-900 font-sans text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#D95D16]/10 text-[#D95D16] flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">Motwani Constructions</h2>
        <p className="text-gray-600 mb-4 text-sm">
          A display glitch occurred while loading this section. Click below to refresh.
        </p>
        {error?.message && (
          <div className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mb-4 text-left break-words overflow-auto max-h-32">
            <strong>Error:</strong> {error.message}
          </div>
        )}
        <button
          onClick={() => reset()}
          className="w-full py-3 bg-[#D95D16] hover:bg-[#c2410c] text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          Reload Experience
        </button>
      </div>
    </div>
  );
}
