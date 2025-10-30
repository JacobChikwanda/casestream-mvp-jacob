"use client";

import type React from "react";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { SecondaryNav } from "./secondary-nav";
import { Header } from "./header";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <SecondaryNav />
        <Breadcrumb />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
