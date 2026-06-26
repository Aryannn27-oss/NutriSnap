"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Elias");
  const [lastName, setLastName] = useState("Thorne");
  const [email, setEmail] = useState("elias.thorne@example.com");
  const [weight, setWeight] = useState(178);
  const [targetWeight, setTargetWeight] = useState(165);
  const [bodyFat, setBodyFat] = useState(18);
  const [bmi, setBmi] = useState(23.4);

  const [dietaryPrefs, setDietaryPrefs] = useState(["High Protein", "Gluten-Free", "Low Carb"]);

  const handleAddPref = () => {
    const newPref = prompt("Enter new dietary preference:");
    if (newPref) {
      setDietaryPrefs([...dietaryPrefs, newPref]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile changes saved successfully!");
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-16 bg-canvas w-full max-w-[1280px] mx-auto pb-32 md:pb-24">
      {/* Page Header */}
      <header className="mb-12 border-b border-low-contrast pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-low-contrast shrink-0 shadow-sm relative">
            <img
              className="w-full h-full object-cover"
              alt="Elias Thorne headshot portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLxIfcf4dcb3GKFYUmTxal-oJLtHI5fHvY_yyYaUJCG6KSVGTVtUt9NFJC1BSCVW1nXsdgJmr_kJ19gGcqthf9bqFTdfu_eNR8mtfW9COD14xAijciGYL2nFHDigsJtUCwroIkwFhKqlht2R3y-N4ZOuoG0EgZDiIMD3zJRtggiCdcHo8xNILjX_gQ6cmSH-XwKqANeW9inbN87yt2h2zECAfKgU_ZMsdRLL_cXLks40KXRFRbjeMcGRiAYKatOpteCT0W8vqvOuw"
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
              NutriSnap Premium Member
            </p>
            <p className="text-xs font-semibold text-slate-muted mt-2 uppercase tracking-wider">
              Member since 2021
            </p>
          </div>
        </div>
        <Link href="/settings">
          <button className="text-sm font-semibold text-primary border border-primary px-6 py-2 rounded hover:bg-surface-container transition-colors inline-block cursor-pointer">
            Edit Profile
          </button>
        </Link>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Health & Diet) */}
        <div className="md:col-span-5 space-y-6">
          {/* Health Profile */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">monitor_weight</span>
              <h2 className="text-xl font-display text-primary">Health Profile</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">Current Weight</span>
                <span className="text-xl font-display text-primary">
                  {weight}
                  <span className="text-sm font-body text-on-surface-variant ml-1">lbs</span>
                </span>
              </div>
              {/* Data Point */}
              <div className="bg-surface-container-low border border-low-contrast rounded p-4 flex flex-col relative overflow-hidden">
                <span className="text-xs font-semibold text-slate-muted mb-1">Target Weight</span>
                <span className="text-xl font-display text-primary">
                  {targetWeight}
                  <span className="text-sm font-body text-on-surface-variant ml-1">lbs</span>
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-border-low-contrast">
                  <div className="h-full bg-[#D9A066]" style={{ width: "40%" }}></div>
                </div>
              </div>
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">Body Fat</span>
                <span className="text-xl font-display text-primary">
                  {bodyFat}
                  <span className="text-sm font-body text-on-surface-variant ml-1">%</span>
                </span>
              </div>
              {/* Data Point */}
              <div className="bg-canvas border border-low-contrast rounded p-4 flex flex-col">
                <span className="text-xs font-semibold text-slate-muted mb-1">BMI</span>
                <span className="text-xl font-display text-primary">{bmi}</span>
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
                  className="px-4 py-2 border border-primary text-primary rounded-full text-sm font-semibold bg-surface-container-low"
                >
                  {pref}
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

        {/* Right Column (Goals & Settings) */}
        <div className="md:col-span-7 space-y-6">
          {/* Nutrition Goals */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center justify-between mb-6 border-b border-low-contrast pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">track_changes</span>
                <h2 className="text-xl font-display text-primary">Daily Targets</h2>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                Edit Targets
              </button>
            </div>
            <div className="space-y-6">
              {/* Goal Item */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-semibold text-on-surface">Calories</span>
                  <span className="text-sm text-slate-muted">2400 kcal</span>
                </div>
                <div className="w-full h-1 bg-border-low-contrast relative my-3">
                  <div className="h-1 bg-primary rounded-sm absolute top-[-1.5px] left-0" style={{ width: "80%" }}></div>
                </div>
              </div>
              {/* Macros Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-low-contrast border-dashed">
                {/* Macro Item */}
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-semibold text-on-surface">Protein</span>
                  </div>
                  <span className="text-sm text-slate-muted block mb-2">180g</span>
                  <div className="w-full h-1 bg-border-low-contrast relative my-3">
                    <div className="h-1 bg-[#D9A066] rounded-sm absolute top-[-1.5px] left-0" style={{ width: "60%" }}></div>
                  </div>
                </div>
                {/* Macro Item */}
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-semibold text-on-surface">Carbs</span>
                  </div>
                  <span className="text-sm text-slate-muted block mb-2">200g</span>
                  <div className="w-full h-1 bg-border-low-contrast relative my-3">
                    <div className="h-1 bg-[#C2CBB5] rounded-sm absolute top-[-1.5px] left-0" style={{ width: "45%" }}></div>
                  </div>
                </div>
                {/* Macro Item */}
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-semibold text-on-surface">Fats</span>
                  </div>
                  <span className="text-sm text-slate-muted block mb-2">70g</span>
                  <div className="w-full h-1 bg-border-low-contrast relative my-3">
                    <div className="h-1 bg-[#fdad67] rounded-sm absolute top-[-1.5px] left-0" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section className="bg-surface border border-low-contrast rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-low-contrast pb-4">
              <span className="material-symbols-outlined text-primary">manage_accounts</span>
              <h2 className="text-xl font-display text-primary">Account Details</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
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
                  className="border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Password</label>
                <div className="relative">
                  <input
                    className="w-full border border-low-contrast bg-canvas p-3 rounded text-base font-body focus:outline-none focus:border-primary transition-colors pr-20"
                    type="password"
                    value="********"
                    readOnly
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    type="button"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-low-contrast flex justify-end gap-4">
                <button
                  className="px-6 py-2 border border-transparent text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-primary text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
