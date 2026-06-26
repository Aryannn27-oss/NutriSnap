"use client";

import React from "react";
import Link from "next/link";

export default function MealLogPage() {
  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24">
      <div className="mb-12 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Meal Log</h2>
        <p className="text-lg font-body text-on-surface-variant">
          View your daily nutrition history and recorded meals.
        </p>
      </div>

      <div className="bg-surface border border-low-contrast rounded-lg p-12 text-center max-w-4xl">
        <span className="material-symbols-outlined text-6xl text-slate-muted mb-4">
          restaurant
        </span>
        <h3 className="text-xl font-display font-semibold text-primary mb-2">No meals logged today</h3>
        <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
          Keep track of your calories and macros by logging your meals with our AI photo analyzer.
        </p>
        <Link href="/upload">
          <button className="bg-primary text-white rounded px-6 py-3 text-sm font-semibold hover:bg-opacity-90 transition-colors shadow-sm cursor-pointer">
            Log Your First Meal
          </button>
        </Link>
      </div>
    </main>
  );
}
