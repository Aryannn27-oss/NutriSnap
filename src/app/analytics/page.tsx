"use client";

import React from "react";

export default function AnalyticsPage() {
  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24">
      <div className="mb-12 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Analytics</h2>
        <p className="text-lg font-body text-on-surface-variant">
          Monitor your long-term nutritional trends and calorie history.
        </p>
      </div>

      <div className="bg-surface border border-low-contrast rounded-lg p-12 text-center max-w-4xl">
        <span className="material-symbols-outlined text-6xl text-slate-muted mb-4">
          insights
        </span>
        <h3 className="text-xl font-display font-semibold text-primary mb-2">Analytics are loading</h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Once you have logged meals over several days, you&apos;ll see charts and trend graphs showing your macro breakdown here.
        </p>
      </div>
    </main>
  );
}
