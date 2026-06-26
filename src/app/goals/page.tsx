"use client";

import React from "react";

export default function GoalsPage() {
  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24">
      <div className="mb-12 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Goals</h2>
        <p className="text-lg font-body text-on-surface-variant">
          Define and manage your target weight, body fat index, and daily macronutrient guidelines.
        </p>
      </div>

      <div className="bg-surface border border-low-contrast rounded-lg p-12 text-center max-w-4xl">
        <span className="material-symbols-outlined text-6xl text-slate-muted mb-4">
          track_changes
        </span>
        <h3 className="text-xl font-display font-semibold text-primary mb-2">Configure nutrition targets</h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Set up customized target calories and macronutrients or sync them directly with your fitness profile.
        </p>
      </div>
    </main>
  );
}
