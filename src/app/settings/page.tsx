"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("Eleanor");
  const [lastName, setLastName] = useState("Vance");
  const [email, setEmail] = useState("eleanor.vance@example.com");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24">
      {/* Page Header */}
      <div className="mb-12 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Settings</h2>
        <p className="text-lg font-body text-on-surface-variant">
          Manage your account preferences, notifications, and data privacy.
        </p>
      </div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Forms Column */}
        <form onSubmit={handleSave} className="lg:col-span-8 space-y-12">
          {/* Account Settings */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <header className="mb-6 flex justify-between items-start">
              <div className="flex items-center gap-2 border-b border-low-contrast pb-4 w-full">
                <h3 className="text-2xl font-display text-primary mb-1">Account details</h3>
              </div>
              <span className="inline-flex items-center rounded-full bg-[#d9eaa3] px-2.5 py-0.5 text-xs font-semibold text-[#243000] shadow-sm border border-[#bdce89] shrink-0 ml-4">
                Premium
              </span>
            </header>
            <p className="text-sm font-body text-on-surface-variant font-normal mb-6">
              Update your personal information and subscription status.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors"
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors pr-10"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="material-symbols-outlined text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 select-none">
                    mail
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="text-sm font-semibold text-primary hover:text-on-surface transition-colors border-b border-primary pb-0.5"
                  type="button"
                >
                  Change Password
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-low-contrast flex justify-end">
              <Link href="/profile">
                <button
                  className="px-6 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors mr-4"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="bg-primary text-white rounded px-6 py-2.5 text-sm font-semibold hover:bg-opacity-90 transition-colors shadow-[0_4px_20px_rgba(25,26,35,0.06)] cursor-pointer"
              >
                Save Account
              </button>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <header className="mb-6 border-b border-low-contrast pb-4 w-full">
              <h3 className="text-2xl font-display text-primary mb-1">Notifications</h3>
            </header>
            <p className="text-sm font-body text-on-surface-variant font-normal mb-6">
              Choose how we communicate with you.
            </p>
            <div className="space-y-6">
              {/* Push Notifications Toggle */}
              <div className="flex items-center justify-between">
                <div className="pr-4">
                  <h4 className="text-base font-medium text-on-surface">Push Notifications</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Receive daily reminders to log your meals and hydration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                    pushNotifications ? "bg-primary" : "bg-[#E2E2DF]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      pushNotifications ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Weekly Report Toggle */}
              <div className="flex items-center justify-between border-t border-low-contrast pt-6">
                <div className="pr-4">
                  <h4 className="text-base font-medium text-on-surface">Weekly Digest</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Receive a summary of your nutrition trends and highlights.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyReport(!weeklyReport)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                    weeklyReport ? "bg-primary" : "bg-[#E2E2DF]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                      weeklyReport ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
