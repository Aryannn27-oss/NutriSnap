"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function GoalsPage() {
  const { profileData, updateProfile } = useAuth();

  // User details for calculation
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState<string>("Male");
  const [activityLevel, setActivityLevel] = useState<string>("Moderately Active");
  const [goalType, setGoalType] = useState<string>("Maintain Weight");

  // Goals
  const [caloriesTarget, setCaloriesTarget] = useState<number | string>("");
  const [proteinTarget, setProteinTarget] = useState<number | string>("");
  const [carbsTarget, setCarbsTarget] = useState<number | string>("");
  const [fatsTarget, setFatsTarget] = useState<number | string>("");
  const [waterTarget, setWaterTarget] = useState<number | string>("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profileData) {
      setAge(profileData.age !== undefined ? profileData.age : "");
      setGender(profileData.gender || "Male");
      setActivityLevel(profileData.activityLevel || "Moderately Active");
      setGoalType(profileData.goalType || "Maintain Weight");
      setCaloriesTarget(profileData.caloriesTarget !== undefined ? profileData.caloriesTarget : "");
      setProteinTarget(profileData.proteinTarget !== undefined ? profileData.proteinTarget : "");
      setCarbsTarget(profileData.carbsTarget !== undefined ? profileData.carbsTarget : "");
      setFatsTarget(profileData.fatsTarget !== undefined ? profileData.fatsTarget : "");
      setWaterTarget(profileData.waterTarget !== undefined ? profileData.waterTarget : "");
    }
  }, [profileData]);

  // Mifflin-St Jeor Formula
  const calculateGoals = () => {
    const height = profileData?.height;
    const weight = profileData?.weight;

    if (!height || !weight) {
      alert("Please update your Height and Weight in your Account Profile first before calculating.");
      return;
    }

    if (!age || Number(age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Convert weight to kg and height to cm
    const weightKg = Number(weight) * 0.45359237;
    const heightCm = Number(height) * 2.54;
    const userAge = Number(age);

    // Calculate BMR
    let bmr = 0;
    if (gender === "Male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * userAge + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * userAge - 161;
    }

    // TDEE Multipliers
    let multiplier = 1.2;
    if (activityLevel === "Sedentary") multiplier = 1.2;
    else if (activityLevel === "Lightly Active") multiplier = 1.375;
    else if (activityLevel === "Moderately Active") multiplier = 1.55;
    else if (activityLevel === "Very Active") multiplier = 1.725;
    else if (activityLevel === "Extra Active") multiplier = 1.9;

    const tdee = bmr * multiplier;

    // Adjust Calories based on Goal Type
    let targetCals = tdee;
    if (goalType === "Lose Weight") targetCals = tdee - 500;
    else if (goalType === "Gain Weight") targetCals = tdee + 500;

    targetCals = Math.round(targetCals);

    // Calculate Macros
    // Protein: 30% of calories (4 kcal/g)
    const targetProt = Math.round((targetCals * 0.3) / 4);
    // Carbs: 45% of calories (4 kcal/g)
    const targetCarbs = Math.round((targetCals * 0.45) / 4);
    // Fats: 25% of calories (9 kcal/g)
    const targetFats = Math.round((targetCals * 0.25) / 9);

    // Water intake (L)
    let targetWater = 2.7;
    if (goalType === "Lose Weight") targetWater = 2.5;
    else if (goalType === "Gain Weight") targetWater = 3.2;

    setCaloriesTarget(targetCals);
    setProteinTarget(targetProt);
    setCarbsTarget(targetCarbs);
    setFatsTarget(targetFats);
    setWaterTarget(targetWater);
  };

  const handleSaveGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile({
        age: age !== "" ? Number(age) : undefined,
        gender,
        activityLevel,
        goalType,
        caloriesTarget: caloriesTarget !== "" ? Number(caloriesTarget) : undefined,
        proteinTarget: proteinTarget !== "" ? Number(proteinTarget) : undefined,
        carbsTarget: carbsTarget !== "" ? Number(carbsTarget) : undefined,
        fatsTarget: fatsTarget !== "" ? Number(fatsTarget) : undefined,
        waterTarget: waterTarget !== "" ? Number(waterTarget) : undefined,
      });
      alert("Nutrition goals saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save nutrition goals.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12 pb-32 md:pb-24 page-transition">
      <div className="mb-12 max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-low-contrast pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">Goals</h2>
          <p className="text-lg font-body text-on-surface-variant">
            Define and manage your target calorie and daily macronutrient guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Auto Calculation Details */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">calculate</span>
              <h3 className="text-xl font-display text-primary">Goals Calculator</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Sedentary">Sedentary (little/no exercise)</option>
                  <option value="Lightly Active">Lightly Active (exercise 1-3 days/wk)</option>
                  <option value="Moderately Active">Moderately Active (exercise 3-5 days/wk)</option>
                  <option value="Very Active">Very Active (hard exercise 6-7 days/wk)</option>
                  <option value="Extra Active">Extra Active (very hard exercise/physical job)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Goal Type</label>
                <select
                  value={goalType}
                  onChange={(e) => setGoalType(e.target.value)}
                  className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Maintain Weight">Maintain Weight</option>
                  <option value="Gain Weight">Gain Weight</option>
                </select>
              </div>

              {(!profileData?.height || !profileData?.weight) && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded">
                  Height and weight are required in your profile before calculations can be run.{" "}
                  <Link href="/profile" className="underline font-semibold text-primary">
                    Update profile
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={calculateGoals}
                className="w-full mt-2 py-3 bg-canvas border border-primary text-primary rounded text-sm font-semibold hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">autorenew</span>
                Calculate Goals
              </button>
            </div>
          </section>
        </div>

        {/* Right Side: Inputs & Save */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSaveGoals} className="bg-surface border border-low-contrast rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">track_changes</span>
              <h3 className="text-xl font-display text-primary">Nutrition Targets</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Daily Calorie Goal (kcal)</label>
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  value={caloriesTarget}
                  onChange={(e) => setCaloriesTarget(e.target.value)}
                  className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Water Intake Goal (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 2.7"
                  value={waterTarget}
                  onChange={(e) => setWaterTarget(e.target.value)}
                  className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="border-t border-low-contrast pt-6 mt-6">
              <h4 className="text-sm font-semibold text-primary mb-4">Macronutrient Targets</h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    value={proteinTarget}
                    onChange={(e) => setProteinTarget(e.target.value)}
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 200"
                    value={carbsTarget}
                    onChange={(e) => setCarbsTarget(e.target.value)}
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="e.g. 65"
                    value={fatsTarget}
                    onChange={(e) => setFatsTarget(e.target.value)}
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-low-contrast flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-primary text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Nutrition Goals"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
