"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, profileData, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  // Health Metrics
  const [weight, setWeight] = useState<number | string>("");
  const [targetWeight, setTargetWeight] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [bmi, setBmi] = useState<number | string>("");

  const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);
  const [showSetupModal, setShowSetupModal] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setEmail(profileData.email || "");
      setWeight(profileData.weight !== undefined ? profileData.weight : "");
      setTargetWeight(profileData.targetWeight !== undefined ? profileData.targetWeight : "");
      setHeight(profileData.height !== undefined ? profileData.height : "");
      setBmi(profileData.bmi !== undefined ? profileData.bmi : "");
      setDietaryPrefs(profileData.dietaryPrefs || []);

      // Auto-trigger setup modal if key health values are not set (acting as onboarding)
      if (
        profileData.weight === undefined ||
        profileData.height === undefined
      ) {
        setShowSetupModal(true);
      }
    }
  }, [profileData]);

  const handleAddPref = async () => {
    const newPref = prompt("Enter new dietary preference:");
    if (newPref) {
      const updated = [...dietaryPrefs, newPref];
      setDietaryPrefs(updated);
      try {
        await updateProfile({ dietaryPrefs: updated });
      } catch (err) {
        console.error("Add pref error:", err);
      }
    }
  };

  const handleRemovePref = async (prefToRemove: string) => {
    const updated = dietaryPrefs.filter((p) => p !== prefToRemove);
    setDietaryPrefs(updated);
    try {
      await updateProfile({ dietaryPrefs: updated });
    } catch (err) {
      console.error("Remove pref error:", err);
    }
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        firstName,
        lastName,
      });
      alert("Account details saved successfully!");
    } catch (err: any) {
      console.error("Save profile error:", err);
      alert("Failed to save account details.");
    }
  };

  const handleSaveSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const w = weight !== "" ? Number(weight) : undefined;
      const h = height !== "" ? Number(height) : undefined;
      
      // Calculate BMI: (weight_lbs / height_inches^2) * 703
      let calculatedBmi: number | undefined = undefined;
      if (w && h && h > 0) {
        calculatedBmi = Number(((w / (h * h)) * 703).toFixed(1));
      }

      await updateProfile({
        weight: w,
        targetWeight: targetWeight !== "" ? Number(targetWeight) : undefined,
        height: h,
        bmi: calculatedBmi,
      });
      setShowSetupModal(false);
      alert("Health profile saved successfully!");
    } catch (err) {
      console.error("Save health setup error:", err);
      alert("Failed to save health data.");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-16 bg-canvas w-full max-w-[1280px] mx-auto pb-32 md:pb-24">
      {/* Page Header */}
      <header className="mb-12 border-b border-low-contrast pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-low-contrast shrink-0 shadow-sm relative">
            <img
              className="w-full h-full object-cover"
              alt="Profile avatar"
              src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuDLxIfcf4dcb3GKFYUmTxal-oJLtHI5fHvY_yyYaUJCG6KSVGTVtUt9NFJC1BSCVW1nXsdgJmr_kJ19gGcqthf9bqFTdfu_eNR8mtfW9COD14xAijciGYL2nFHDigsJtUCwroIkwFhKqlht2R3y-N4ZOuoG0EgZDiIMD3zJRtggiCdcHo8xNILjX_gQ6cmSH-XwKqANeW9inbN87yt2h2zECAfKgU_ZMsdRLL_cXLks40KXRFRbjeMcGRiAYKatOpteCT0W8vqvOuw"}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-primary mb-1">
              {firstName} {lastName}
            </h1>
            <p className="text-lg font-body text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D9A066] fill" style={{ fontSize: "18px" }}>
                verified
              </span>
              NutriSnap {profileData?.isPremium ? "Premium" : "Free"} Member
            </p>
            <p className="text-xs font-semibold text-slate-muted mt-2 uppercase tracking-wider">
              Member since {profileData?.memberSince || "2026"}
            </p>
          </div>
        </div>
        <Link href="/settings">
          <button className="text-sm font-semibold text-primary border border-primary px-6 py-2 rounded hover:bg-surface-container transition-colors inline-block cursor-pointer">
            Edit Preferences
          </button>
        </Link>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Health & Diet) */}
        <div className="md:col-span-5 space-y-6">
          {/* Health Profile */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center justify-between mb-6 border-b border-low-contrast pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">monitor_weight</span>
                <h2 className="text-xl font-display text-primary">Health Profile</h2>
              </div>
              <button
                onClick={() => setShowSetupModal(true)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">Current Weight</span>
                <span className="text-xl font-display text-primary">
                  {weight !== "" ? (
                    <>
                      {weight}
                      <span className="text-sm font-body text-on-surface-variant ml-1">lbs</span>
                    </>
                  ) : (
                    "—"
                  )}
                </span>
              </div>
              {/* Data Point */}
              <div className="bg-surface-container-low border border-low-contrast rounded p-4 flex flex-col relative overflow-hidden">
                <span className="text-xs font-semibold text-slate-muted mb-1">Target Weight</span>
                <span className="text-xl font-display text-primary">
                  {targetWeight !== "" ? (
                    <>
                      {targetWeight}
                      <span className="text-sm font-body text-on-surface-variant ml-1">lbs</span>
                    </>
                  ) : (
                    "—"
                  )}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-border-low-contrast">
                  <div
                    className="h-full bg-[#D9A066]"
                    style={{
                      width: weight && targetWeight ? `${Math.min(100, (Number(targetWeight) / Number(weight)) * 100)}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">Height</span>
                <span className="text-xl font-display text-primary">
                  {height !== "" ? (
                    <>
                      {height}
                      <span className="text-sm font-body text-on-surface-variant ml-1">in</span>
                    </>
                  ) : (
                    "—"
                  )}
                </span>
              </div>
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">BMI</span>
                <span className="text-xl font-display text-primary">{bmi !== "" ? bmi : "—"}</span>
              </div>
            </div>
          </section>

          {/* Dietary Preferences */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">restaurant_menu</span>
              <h2 className="text-xl font-display text-primary">Dietary Preferences</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {dietaryPrefs.map((pref, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 border border-primary text-primary rounded-full text-sm font-semibold bg-surface-container-low flex items-center gap-2"
                >
                  {pref}
                  <button
                    onClick={() => handleRemovePref(pref)}
                    className="hover:text-red-600 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                    aria-label={`Remove ${pref}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </span>
              ))}
              <button
                onClick={handleAddPref}
                className="px-4 py-2 border border-dashed border-primary text-primary rounded-full text-sm font-semibold hover:bg-surface-container transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Add
              </button>
            </div>
          </section>
        </div>

        {/* Right Column (Settings) */}
        <div className="md:col-span-7 space-y-6">
          {/* Account Details */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">manage_accounts</span>
              <h2 className="text-xl font-display text-primary">Account Details</h2>
            </div>
            <form onSubmit={handleSaveAccount} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">First Name</label>
                  <input
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Last Name</label>
                  <input
                    className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Email Address</label>
                <input
                  className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors opacity-70"
                  type="email"
                  value={email}
                  readOnly
                />
              </div>
              <div className="pt-4 border-t border-low-contrast flex justify-end gap-4">
                <button
                  className="px-6 py-2 bg-primary text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  type="submit"
                >
                  Save Account Details
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* SETUP & ONBOARDING HEALTH MODAL */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-surface border border-low-contrast rounded-lg max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-2xl font-display text-primary font-bold mb-2">Complete Health Setup</h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Enter your current health details to personalize your NutriSnap profile.
            </p>
            <form onSubmit={handleSaveSetup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Height (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 70"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Weight (lbs)</label>
                  <input
                    type="number"
                    placeholder="e.g. 175"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Target Weight (lbs)</label>
                <input
                  type="number"
                  placeholder="e.g. 160"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="border border-low-contrast bg-canvas p-2.5 rounded text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-low-contrast mt-6">
                {profileData?.weight && profileData?.height && (
                  <button
                    type="button"
                    onClick={() => setShowSetupModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
