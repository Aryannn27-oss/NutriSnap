"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-surface dark:bg-background border-b border-low-contrast flex justify-between items-center w-full px-6 md:px-16 h-16 max-w-7xl mx-auto sticky top-0 z-40 shadow-sm md:shadow-none">
      <div className="flex items-center gap-6">
        <Link href="/dashboard">
          <h1 className="text-xl font-display font-bold text-primary cursor-pointer">
            NutriSnap
          </h1>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/dashboard" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/meals" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors">
            Journal
          </Link>
          <Link href="/upload" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors">
            Kitchen
          </Link>
          <Link href="/analytics" className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors">
            Insights
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative text-on-surface-variant">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2" style={{ fontSize: "18px" }}>
            search
          </span>
          <input
            className="bg-surface-container border border-low-contrast rounded-full pl-9 pr-4 py-1 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48"
            placeholder="Search..."
            type="text"
          />
        </div>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <img
          alt="User profile photo"
          className="w-8 h-8 rounded-full border border-low-contrast object-cover cursor-pointer ml-2"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC3r4NH-0DVwbHzv2zt6JNsqz9iGgaFdIY61miQ1Y7NpAdP-Yc32-GLD98Lul-mXVTKasxPwRn4l9qBT_GffKhPxlFx7OqS26we2XYWkXTDUk1mlbbMAYjKzWcWZYB1w4yB4Q1lKq1DfXbaq-tv0fndEf_PwKOr8KW_Y-eEyV8Og0i1MnjjK1H1dHpeR0iubcQIDXkfvL8Yad7o8NVZUHJCQq7f0AKk9oGB6AmxgmoVSYqEVW3BR98sWuDf0aEAXkqp4co4uREhrc"
        />
      </div>
    </header>
  );
}
