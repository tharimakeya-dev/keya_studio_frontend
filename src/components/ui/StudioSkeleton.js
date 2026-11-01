import React from 'react';

export default function StudioSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse flex flex-col h-[430px]"
        >
          <div className="h-56 bg-zinc-200 dark:bg-zinc-800 relative">
            <div className="absolute top-3.5 left-3.5 w-24 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
            <div className="absolute top-3.5 right-3.5 w-12 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="w-28 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-full h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-4/5 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="w-20 h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-28 h-9 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
