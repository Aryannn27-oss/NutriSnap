"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 md:p-16 bg-canvas w-full max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left/Main Column: Dashboard Stats & Progress */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-display text-primary font-bold">Today</h2>
              <p className="text-lg text-on-surface-variant mt-1">Thursday, October 24</p>
            </div>
            {/* Desktop Actions */}
            <div className="hidden lg:flex space-x-4 items-center text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                notifications
              </span>
              <Link href="/settings" className="flex items-center">
                <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                  settings
                </span>
              </Link>
              <Link href="/profile" className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-low-contrast cursor-pointer"
                  alt="Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByD8iqD0-wsiqknttzQBkMDaEW4yBTHhOvIBHkcB_G1FfnK7pyUqbobcM_D-rUN9TlIb-g3V2571HgZsd2MEkFSBZSxzqan9CiYI84DIprgLbtuAo2UpsEDAv3XgQs4gBit42MgWndn_Zv5UEsRBL3o8YvUjCacPGIeK-y2wWiOIpcVwh8R5ruuLV3i4yQnhgJ2vFRwcx7zHjkrlHo8VTaOj8n0BfHW0moudDX02m4Dp7U5SqUSCHXxvRR91M6JM2roSc9ApcpJKA"
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
                  <span className="text-2xl font-display text-primary font-bold">1,840</span>
                  <span className="text-sm text-on-surface-variant"> / 2400</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-clay-light"
                  style={{ width: "76%" }}
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
                  <span className="text-2xl font-display text-primary font-bold">112g</span>
                  <span className="text-sm text-on-surface-variant"> / 140g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-sage-light"
                  style={{ width: "80%" }}
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
                  <span className="text-2xl font-display text-primary font-bold">180g</span>
                  <span className="text-sm text-on-surface-variant"> / 250g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-primary-fixed"
                  style={{ width: "72%" }}
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
                  <span className="text-2xl font-display text-primary font-bold">45g</span>
                  <span className="text-sm text-on-surface-variant"> / 65g</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1 mt-4 relative">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-secondary-fixed"
                  style={{ width: "69%" }}
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
            {/* Simple conceptual chart structure */}
            <div className="h-48 flex items-end justify-between space-x-2 px-2 relative border-b border-slate-muted border-opacity-20 pb-2">
              {/* Y-axis lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
                <div className="w-full border-t border-slate-muted border-opacity-20 h-0"></div>
              </div>
              {/* Bars */}
              <div className="w-1/7 bg-surface-container hover:bg-slate-200 transition-colors rounded-t h-[60%] relative group cursor-pointer">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-canvas text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  1400 kcal
                </div>
              </div>
              <div className="w-1/7 bg-surface-container hover:bg-slate-200 transition-colors rounded-t h-[80%] relative group cursor-pointer">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-canvas text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  1900 kcal
                </div>
              </div>
              <div className="w-1/7 bg-primary-fixed hover:bg-opacity-80 transition-colors rounded-t h-[75%] relative group cursor-pointer">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-canvas text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  1840 kcal
                </div>
              </div>
              <div className="w-1/7 bg-slate-100 rounded-t h-0"></div>
              <div className="w-1/7 bg-slate-100 rounded-t h-0"></div>
              <div className="w-1/7 bg-slate-100 rounded-t h-0"></div>
              <div className="w-1/7 bg-slate-100 rounded-t h-0"></div>
            </div>
            <div className="flex justify-between px-2 mt-2 text-xs text-on-surface-variant uppercase font-semibold">
              <span>M</span>
              <span>T</span>
              <span className="text-primary font-bold">W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>

          {/* Today's Meals Grid */}
          <div>
            <h3 className="text-xl font-display text-primary font-bold mb-4">Today's Meals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meal Card 1 */}
              <div className="bg-white border border-low-contrast rounded-lg overflow-hidden group shadow-sm">
                <div
                  className="bg-cover bg-center w-full h-48"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzzvIK_eiQShAQGNibQHjQEl1IJJtY9qAM0DmSdMnX8JW4EZ_3CqUx0T_hc4kryK7KF4MaCFlLlkG56VGZOB00eFoluMVinI4DtoWGZuyBloe-5MPtfXaPfEIgMY91Cr-Jv-9TQjGZmG0yUM0UxcMqL9pJLolnnvI8XBhZlGg7JcfVqNFACL6A5evA1wv8vhS_M-lqkvnzQODzSHFgnycVWJt3Ud0oi_oK1rqWNht9004RDpefAI2eYoKwoY6Fno1tcYBK6U5KD4c')`,
                  }}
                ></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold text-on-surface-variant uppercase">
                        Breakfast
                      </span>
                      <h4 className="text-lg font-semibold text-primary mt-1">Avocado Toast & Egg</h4>
                    </div>
                    <span className="text-sm font-semibold text-primary bg-primary-fixed px-2 py-1 rounded">
                      420 kcal
                    </span>
                  </div>
                  <div className="flex space-x-4 text-xs text-on-surface-variant mt-3 font-semibold">
                    <span>P: 18g</span>
                    <span>C: 32g</span>
                    <span>F: 22g</span>
                  </div>
                </div>
              </div>

              {/* Meal Card 2 */}
              <div className="bg-white border border-low-contrast rounded-lg overflow-hidden group shadow-sm">
                <div
                  className="bg-cover bg-center w-full h-48"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLboxAMyHhfbKy9FEdz3hlL9pRh-3qGjtekp4_C_Kc-0vWmXdLbFzqfkMZK7kFWzulSvSIBTBm7QcSWXf4Sv7pyqVJrvu28NJBWvejTUrqZHsiVyxzeZ84sipHbSw2NPPyQGsbQ_FypQ7BFkUIzzv26xzKM2nKdfssmdijEcJ4ypmitMdm04PnUeZLHTkT_NngZ34uJ16NPRDXdP31bxNkh3ENxbsd8kK4LNTnZxwpPc-9EE3L1B1HNoONDrceGd2bwG6Q65pUu0o')`,
                  }}
                ></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold text-on-surface-variant uppercase">
                        Lunch
                      </span>
                      <h4 className="text-lg font-semibold text-primary mt-1">Roasted Quinoa Bowl</h4>
                    </div>
                    <span className="text-sm font-semibold text-primary bg-primary-fixed px-2 py-1 rounded">
                      650 kcal
                    </span>
                  </div>
                  <div className="flex space-x-4 text-xs text-on-surface-variant mt-3 font-semibold">
                    <span>P: 24g</span>
                    <span>C: 65g</span>
                    <span>F: 28g</span>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Daily Goals */}
          <div className="bg-white border border-low-contrast rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-display text-primary font-bold mb-6 border-b border-low-contrast pb-2">
              Daily Goals
            </h3>
            <div className="space-y-6">
              {/* Goal 1 */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-on-surface">Hydration</span>
                  <span className="text-on-surface-variant">1.2 / 2.5 L</span>
                </div>
                <div className="w-full bg-slate-100 h-1 relative">
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-clay-light"
                    style={{ width: "48%" }}
                  ></div>
                </div>
              </div>
              {/* Goal 2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-on-surface">Fiber</span>
                  <span className="text-on-surface-variant">18 / 30 g</span>
                </div>
                <div className="w-full bg-slate-100 h-1 relative">
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-sage-light"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              {/* Goal 3 */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-on-surface">Steps</span>
                  <span className="text-on-surface-variant">6,420 / 10,000</span>
                </div>
                <div className="w-full bg-slate-100 h-1 relative">
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded bg-slate-400"
                    style={{ width: "64%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

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
