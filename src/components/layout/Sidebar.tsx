"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut, profileData } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Meal Log", href: "/meals", icon: "restaurant" },
    { name: "Analytics", href: "/analytics", icon: "insights" },
    { name: "Goals", href: "/goals", icon: "track_changes" },
    { name: "Account", href: "/profile", icon: "person" },
  ];

  return (
    <nav className="bg-canvas lg:flex flex-col p-6 space-y-4 fixed left-0 top-0 h-full w-64 border-r border-low-contrast z-40 hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">NutriSnap</h1>
        <p className="text-xs font-body text-on-surface-variant mt-1">
          {profileData?.isPremium ? "Premium Edition" : "Free Edition"}
        </p>
      </div>

      <div className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 pl-4 py-2 transition-all duration-200 ease-in-out text-sm font-semibold rounded-md ${
                isActive
                  ? "text-primary font-bold border-l-4 border-primary bg-surface-container"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <Link href="/upload" className="w-full">
        <button className="bg-primary text-white rounded py-3 text-sm font-semibold w-full mt-auto mb-4 hover:bg-opacity-90 transition-colors cursor-pointer">
          Log New Meal
        </button>
      </Link>

      <div className="border-t border-low-contrast pt-4 flex flex-col space-y-2">
        <a href="#support" className="flex items-center space-x-3 text-on-surface-variant pl-4 py-2 hover:bg-surface-container hover:text-primary transition-all duration-200 ease-in-out text-sm font-semibold">
          <span className="material-symbols-outlined">help</span>
          <span>Support</span>
        </a>
        <button 
          onClick={() => signOut()}
          className="flex items-center space-x-3 text-on-surface-variant pl-4 py-2 hover:bg-surface-container hover:text-primary transition-all duration-200 ease-in-out text-sm font-semibold w-full text-left cursor-pointer focus:outline-none"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
