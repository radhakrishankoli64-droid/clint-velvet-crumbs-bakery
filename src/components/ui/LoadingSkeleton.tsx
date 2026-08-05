import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 p-4 space-y-4 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-stone-200 dark:bg-stone-800" />
      <div className="space-y-2">
        <div className="h-3 w-1/3 bg-stone-200 dark:bg-stone-800 rounded-sm" />
        <div className="h-5 w-3/4 bg-stone-200 dark:bg-stone-800 rounded-md" />
        <div className="h-3 w-full bg-stone-200 dark:bg-stone-800 rounded-sm" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 w-1/4 bg-stone-200 dark:bg-stone-800 rounded-md" />
        <div className="h-9 w-1/3 bg-stone-200 dark:bg-stone-800 rounded-xl" />
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="h-10 w-1/3 bg-stone-200 dark:bg-stone-800 rounded-xl mx-auto" />
      <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800 rounded-md mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="h-64 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
        <div className="h-64 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
        <div className="h-64 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
      </div>
    </div>
  );
};
