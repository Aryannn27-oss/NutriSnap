"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Meal {
  id: string;
  name: string;
  mealType: string;
  mealTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
  date: string;
  detectedItems?: any[];
}

export default function MealLogPage() {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("Dinner");
  const [editTime, setEditTime] = useState("");
  const [editCalories, setEditCalories] = useState<number | string>("");
  const [editProtein, setEditProtein] = useState<number | string>("");
  const [editCarbs, setEditCarbs] = useState<number | string>("");
  const [editFats, setEditFats] = useState<number | string>("");

  useEffect(() => {
    if (!user) return;

    const mealsRef = collection(db, "users", user.uid, "meals");
    const unsubscribe = onSnapshot(
      mealsRef,
      (snapshot) => {
        const mealsList = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Meal[];
        // Sort meals by date and time descending
        mealsList.sort((a, b) => `${b.date}T${b.mealTime}`.localeCompare(`${a.date}T${a.mealTime}`));
        setMeals(mealsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error loading meals:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (mealId: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this meal log?")) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "meals", mealId));
      alert("Meal log deleted.");
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Failed to delete meal log.");
    }
  };

  const startEdit = (meal: Meal) => {
    setEditingMealId(meal.id);
    setEditName(meal.name);
    setEditType(meal.mealType);
    setEditTime(meal.mealTime);
    setEditCalories(meal.calories);
    setEditProtein(meal.protein);
    setEditCarbs(meal.carbs);
    setEditFats(meal.fats);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingMealId) return;

    try {
      await updateDoc(doc(db, "users", user.uid, "meals", editingMealId), {
        name: editName,
        mealType: editType,
        mealTime: editTime,
        calories: Number(editCalories),
        protein: Number(editProtein),
        carbs: Number(editCarbs),
        fats: Number(editFats),
        updatedAt: serverTimestamp(),
      });
      setEditingMealId(null);
      alert("Meal log updated!");
    } catch (err) {
      console.error("Error updating meal:", err);
      alert("Failed to update meal log.");
    }
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24 page-transition">
      <div className="mb-12 max-w-4xl flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Meal Log</h2>
          <p className="text-lg font-body text-on-surface-variant">
            View your daily nutrition history and recorded meals.
          </p>
        </div>
        <Link href="/upload">
          <button className="bg-primary text-white rounded px-5 py-2.5 text-sm font-semibold hover:bg-opacity-90 transition-colors shadow-sm cursor-pointer flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">add</span> Log Meal
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-muted">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm">Loading nutrition logs...</p>
        </div>
      ) : meals.length === 0 ? (
        <div className="bg-surface border border-low-contrast rounded-lg p-12 text-center max-w-4xl">
          <span className="material-symbols-outlined text-6xl text-slate-muted mb-4">restaurant</span>
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
      ) : (
        <div className="space-y-6 max-w-4xl">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-surface border border-low-contrast rounded-lg p-6 shadow-xs flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              {editingMealId === meal.id ? (
                /* Edit Form Mode */
                <form onSubmit={handleUpdate} className="w-full space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-muted">Meal Description</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-muted">Meal Type</label>
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                          className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                        >
                          <option>Breakfast</option>
                          <option>Lunch</option>
                          <option>Dinner</option>
                          <option>Snack</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-muted">Time</label>
                        <input
                          type="time"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-low-contrast border-dashed">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-muted">Calories (kcal)</label>
                      <input
                        type="number"
                        value={editCalories}
                        onChange={(e) => setEditCalories(e.target.value)}
                        className="border border-low-contrast bg-canvas p-2 rounded text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-muted">Protein (g)</label>
                      <input
                        type="number"
                        value={editProtein}
                        onChange={(e) => setEditProtein(e.target.value)}
                        className="border border-low-contrast bg-canvas p-2 rounded text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-muted">Carbs (g)</label>
                      <input
                        type="number"
                        value={editCarbs}
                        onChange={(e) => setEditCarbs(e.target.value)}
                        className="border border-low-contrast bg-canvas p-2 rounded text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-semibold text-slate-muted">Fats (g)</label>
                      <input
                        type="number"
                        value={editFats}
                        onChange={(e) => setEditFats(e.target.value)}
                        className="border border-low-contrast bg-canvas p-2 rounded text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingMealId(null)}
                      className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-primary text-white rounded text-xs font-semibold hover:opacity-90"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <>
                  <div className="flex items-center gap-4">
                    {meal.imageUrl && (
                      <img
                        src={meal.imageUrl}
                        alt={meal.name}
                        className="w-16 h-16 object-cover rounded border border-low-contrast shadow-sm"
                      />
                    )}
                    <div>
                      <span className="text-xs font-semibold text-[#D9A066] uppercase bg-secondary-fixed px-2 py-0.5 rounded mr-2">
                        {meal.mealType}
                      </span>
                      <span className="text-xs text-slate-muted font-semibold">
                        {meal.date} • {meal.mealTime}
                      </span>
                      <h4 className="text-lg font-semibold text-primary mt-1">{meal.name}</h4>
                      <p className="text-xs text-on-surface-variant font-medium mt-1">
                        P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fats}g
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 border-low-contrast pt-4 md:pt-0">
                    <span className="text-lg font-bold text-primary bg-primary-fixed px-3 py-1.5 rounded">
                      {meal.calories} kcal
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(meal)}
                        className="text-xs font-semibold text-primary border border-primary px-3.5 py-1.5 rounded hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(meal.id)}
                        className="text-xs font-semibold text-red-600 border border-red-200 px-3.5 py-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
