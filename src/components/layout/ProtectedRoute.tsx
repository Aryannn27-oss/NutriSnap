"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  // Loading state matching premium calm theme
  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center text-primary">
        <h1 className="font-display text-4xl italic mb-4 animate-pulse">NutriSnap</h1>
        <div className="w-12 h-0.5 bg-border-low-contrast relative overflow-hidden">
          <div className="absolute h-full w-4 bg-primary animate-infinite-loading"></div>
        </div>
        <style jsx global>{`
          @keyframes loading {
            0% { left: -33%; }
            100% { left: 100%; }
          }
          .animate-infinite-loading {
            animation: loading 1.5s infinite linear;
          }
        `}</style>
      </div>
    );
  }

  // If user is authenticated or on auth screens, allow access
  if (user || pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  // Return empty container while redirecting
  return null;
}
