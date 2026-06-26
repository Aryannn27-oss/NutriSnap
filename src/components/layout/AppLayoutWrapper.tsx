"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="flex-1 overflow-y-auto w-full">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:pl-64">
        {/* Header (Top Nav) - Hidden on desktop, sidebar handles branding */}
        <div className="lg:hidden">
          <Header />
        </div>

        {/* Scrollable Page Container */}
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
