import { DashboardLayout } from "@/components/app-ui/dashboard/dashboard-layout";
import React from "react";

interface TenantLayoutProps {
  children: React.ReactNode;
}

export default async function TenantLayout({ children }: TenantLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
