"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Meal {
  id: string;
  name?: string;
  mealType?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  imageUrl?: string;
  date?: string;
}

// Compute the current week's local date strings (Mon-Sun)
const getWeekDays = () => {
  const current = new Date();
  const day = current.getDay();
  // Adjust for Sunday being 0 -> Monday becomes -6
  const diff = current.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(current.setDate(diff));

  const days: { dateStr: string; label: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
    const label = d.toLocaleDateString(undefined, { weekday: "short" })[0]; // 'M', 'T', 'W'...
    days.push({ dateStr, label });
  }
  return days;
};

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, profileData } = useAuth();
  const [weeklyMeals, setWeeklyMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    if (!user) return;

    const weekDays = getWeekDays();
    const weekStartStr = weekDays[0].dateStr;
    const weekEndStr = weekDays[6].dateStr;

    const mealsRef = collection(db, "users", user.uid, "meals");
    const q = query(
      mealsRef,
      where("date", ">=", weekStartStr),
      where("date", "<=", weekEndStr)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const mealsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Meal[];
        setWeeklyMeals(mealsList);
        setLoadingMeals(false);
      },
      (err) => {
        console.error("Error fetching weekly meals:", err);
        setLoadingMeals(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const todayStr = new Date().toLocaleDateString("en-CA");
  const todayMeals = weeklyMeals.filter((m) => m.date === todayStr);

  const caloriesLimit = profileData?.caloriesTarget || 1;
  const proteinLimit = profileData?.proteinTarget || 1;
  const carbsLimit = profileData?.carbsTarget || 1;
  const fatsLimit = profileData?.fatsTarget || 1;

  const totalCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProtein = todayMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = todayMeals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFats = todayMeals.reduce((sum, m) => sum + (m.fats || 0), 0);

  const caloriesPct = Math.min(100, Math.round((totalCalories / caloriesLimit) * 100));
  const proteinPct = Math.min(100, Math.round((totalProtein / proteinLimit) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbs / carbsLimit) * 100));
  const fatsPct = Math.min(100, Math.round((totalFats / fatsLimit) * 100));

  const currentDateLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (profileData && !profileData.caloriesTarget) {
    return (
      <main className="flex-1 p-6 md:p-16 bg-canvas w-full max-w-7xl mx-auto flex items-center justify-center min-h-[70vh] page-transition">
        <div className="bg-white border border-low-contrast rounded-lg p-12 text-center max-w-lg shadow-sm">
          <span className="material-symbols-outlined text-6xl text-slate-muted mb-4">
            track_changes
          </span>
          <h3 className="text-2xl font-display font-semibold text-primary mb-3">Set Up Your Nutrition Goals</h3>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            To start tracking your daily calories and macronutrient progress, please configure your goals. You can let us calculate them or enter them manually.
          </p>
          <Link href="/goals">
            <button className="bg-primary text-white rounded px-6 py-3 text-sm font-semibold hover:bg-opacity-90 transition-colors shadow-sm cursor-pointer">
              Configure Goals
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-16 bg-canvas w-full max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left/Main Column: Dashboard Stats & Progress */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display text-primary font-bold">
                {profileData?.firstName ? `Today, ${profileData.firstName}` : "Today"}
              </h2>
              <p className="text-lg text-on-surface-variant mt-1">{currentDateLabel}</p>
            </div>
            {/* Desktop Actions */}
            <div className="hidden lg:flex space-x-4 items-center text-on-surface-variant relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors focus:outline-none p-1"
              >
                notifications
              </button>
              {showNotifications && (
                <div className="absolute right-24 top-12 w-64 bg-white border border-low-contrast rounded shadow-lg p-4 z-50 text-left">
                  <h4 className="text-sm font-semibold text-primary mb-2">Notifications</h4>
                  <p className="text-xs text-on-surface-variant font-normal">You're all caught up! No new notifications.</p>
                </div>
              )}
              <Link href="/settings" className="flex items-center">
                <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                  settings
                </span>
              </Link>
              <Link href="/profile" className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-low-contrast cursor-pointer"
                  alt="Profile"
                  src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuByD8iqD0-wsiqknttzQBkMDaEW4yBTHhOvIBHkcB_G1FfnK7pyUqbobcM_D-rUN9TlIb-g3V2571HgZsd2MEkFSBZSxzqan9CiYI84DIprgLbtuAo2UpsEDAv3XgQs4gBit42MgWndn_Zv5UEsRBL3o8YvUjCacPGIeK-y2wWiOIpcVwh8R5ruuLV3i4yQnhgJ2vFRwcx7zHjkrlHo8VTaOj8n0BfHW0moudDX02m4Dp7U5SqUSCHXxvRR91M6JM2roSc9ApcpJKA"}
                />
              </Link>
            </div>
          </div>

          {/* Macro Cards (Bento style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Calories */}
            <div className="bg-white border border-low-contrast rounded-lg p-6 flex flex-col justify-between h-40 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Calories
                </span>
                <div className="mt-2">
                  <span className="text-2xl font-display text-primary font-bold">
                    {totalCalories}
                  </span>
                  <span className="text-sm text-on-surface-variant"> / {caloriesLimit} kcal</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-clay-light"
                  style={{ width: `${caloriesPct}%` }}
                ></div>
              </div>
            </div>

            {/* Protein */}
            <div className="bg-white border border-low-contrast rounded-lg p-6 flex flex-col justify-between h-40 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Protein
                </span>
                <div className="mt-2">
                  <span className="text-2xl font-display text-primary font-bold">{totalProtein}</span>
                  <span className="text-sm text-on-surface-variant"> / {proteinLimit} g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-sage-light"
                  style={{ width: `${proteinPct}%` }}
                ></div>
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-white border border-low-contrast rounded-lg p-6 flex flex-col justify-between h-40 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Carbs
                </span>
                <div className="mt-2">
                  <span className="text-2xl font-display text-primary font-bold">{totalCarbs}</span>
                  <span className="text-sm text-on-surface-variant"> / {carbsLimit} g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-primary-fixed"
                  style={{ width: `${carbsPct}%` }}
                ></div>
              </div>
            </div>

            {/* Fats */}
            <div className="bg-white border border-low-contrast rounded-lg p-6 flex flex-col justify-between h-40 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Fats
                </span>
                <div className="mt-2">
                  <span className="text-2xl font-display text-primary font-bold">{totalFats}</span>
                  <span className="text-sm text-on-surface-variant"> / {fatsLimit} g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-secondary-fixed"
                  style={{ width: `${fatsPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Weekly Chart Section */}
          <div className="bg-white border border-low-contrast rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display text-primary font-bold">Weekly Energy</h3>
              <button className="text-xs text-on-surface-variant flex items-center hover:text-primary transition-colors cursor-pointer">
                This Week <span className="material-symbols-outlined text-sm ml-1">expand_more</span>
              </button>
            </div>
            {/* Simple dynamic chart structure */}
            <div className="h-48 flex items-end justify-between space-x-2 px-2 relative border-b border-slate-muted border-opacity-20 pb-2">
              {/* Y-axis lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
              </div>
              {/* Bars */}
              {getWeekDays().map((day, idx) => {
                const isToday = day.dateStr === todayStr;
                const dayMeals = weeklyMeals.filter((m) => m.date === day.dateStr);
                const dayKcal = dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
                const heightPct = Math.min(100, Math.round((dayKcal / caloriesLimit) * 100));
                
                return (
                  <div
                    key={idx}
                    className={`w-1/7 rounded-t relative group cursor-pointer transition-all duration-300 ${
                      isToday ? "bg-primary-fixed hover:bg-opacity-80" : "bg-slate-100 hover:bg-slate-200"
                    }`}
                    style={{ height: `${Math.max(2, heightPct)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-canvas text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {dayKcal} kcal
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between px-2 mt-2 text-xs text-on-surface-variant uppercase font-semibold">
              {getWeekDays().map((day, idx) => {
                const isToday = day.dateStr === todayStr;
                return (
                  <span key={idx} className={isToday ? "text-primary font-bold" : ""}>
                    {day.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Today's Meals Grid */}
          <div>
            <h3 className="text-xl font-display text-primary font-bold mb-4">Today's Meals</h3>
            {todayMeals.length === 0 ? (
              <div className="bg-white border border-low-contrast rounded-lg p-10 text-center shadow-sm">
                <span className="material-symbols-outlined text-5xl text-slate-muted mb-3">restaurant</span>
                <h4 className="text-lg font-semibold text-primary mb-1">No meals logged today</h4>
                <p className="text-xs text-on-surface-variant mb-6 max-w-sm mx-auto">
                  Take a photo of your food to automatically break down and track your macros.
                </p>
                <Link href="/upload">
                  <button className="bg-primary text-white rounded px-5 py-2 text-xs font-semibold hover:bg-opacity-90 transition-colors shadow-xs cursor-pointer">
                    Log Your First Meal
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {todayMeals.map((meal) => (
                  <div key={meal.id} className="bg-white border border-low-contrast rounded-lg overflow-hidden group shadow-sm">
                    {meal.imageUrl && (
                      <div
                        className="bg-cover bg-center w-full h-48"
                        style={{ backgroundImage: `url('${meal.imageUrl}')` }}
                      ></div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-semibold text-on-surface-variant uppercase">
                            {meal.mealType || "Meal"}
                          </span>
                          <h4 className="text-lg font-semibold text-primary mt-1">
                            {meal.name || "Untitled Log"}
                          </h4>
                        </div>
                        <span className="text-sm font-semibold text-primary bg-primary-fixed px-2 py-1 rounded">
                          {meal.calories} kcal
                        </span>
                      </div>
                      <div className="flex space-x-4 text-xs text-on-surface-variant mt-3 font-semibold">
                        <span>P: {meal.protein || 0}g</span>
                        <span>C: {meal.carbs || 0}g</span>
                        <span>F: {meal.fats || 0}g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Goals & Quick Entry */}
        <div className="w-full xl:w-80 flex flex-col space-y-6">
          {/* Quick Log */}
          <Link
            href="/upload"
            className="bg-primary text-white rounded-lg p-6 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:bg-opacity-95 transition-colors group"
          >
            <span className="material-symbols-outlined text-4xl mb-3 group-hover:scale-105 transition-transform">
              add_a_photo
            </span>
            <h3 className="text-xl font-display font-semibold mb-1">Log Meal</h3>
            <p className="text-sm opacity-80">Snap a photo to estimate macros</p>
          </Link>

          {/* Insight Highlight */}
          <div className="bg-white border border-low-contrast rounded-lg p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed opacity-50 rounded-bl-full -z-10"></div>
            <span className="material-symbols-outlined text-primary mb-3">lightbulb</span>
            <h4 className="text-xs font-semibold text-primary uppercase mb-2">Insight</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              You're trending higher in healthy fats this week compared to last. Keep balancing with complex carbs!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
