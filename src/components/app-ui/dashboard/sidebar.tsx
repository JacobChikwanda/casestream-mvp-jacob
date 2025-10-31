"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  FileText,
  Wrench,
  Users,
  DollarSign,
  Settings,
  Code,
  CheckCircle,
  CreditCard,
  Scale,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subItems?: { title: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    subItems: [],
  },
  {
    title: "Case Management",
    icon: Briefcase,
    href: "/dashboard/cases",
    subItems: [
      { title: "Active Cases", href: "/dashboard/cases/active" },
      { title: "Closed Cases", href: "/dashboard/cases/closed" },
      { title: "Case Calendar", href: "/dashboard/cases/calendar" },
      { title: "Case Documents", href: "/dashboard/cases/documents" },
      { title: "Case Reports", href: "/dashboard/cases/reports" },
    ],
  },
  {
    title: "Intake",
    icon: FileText,
    href: "/intake",
    subItems: [
      { title: "New Intake", href: "/intake/new" },
      { title: "Pending Review", href: "/intake/pending" },
      { title: "Intake Forms", href: "/intake/forms" },
      { title: "Client Screening", href: "/intake/screening" },
      { title: "Intake Reports", href: "/intake/reports" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    href: "/tools",
    subItems: [
      { title: "Document Generator", href: "/tools/documents" },
      { title: "Time Tracker", href: "/tools/time-tracker" },
      { title: "Billing Calculator", href: "/tools/billing" },
      { title: "Legal Research", href: "/tools/research" },
      { title: "Templates", href: "/tools/templates" },
    ],
  },
  {
    title: "Staff",
    icon: Users,
    href: "/dashboard/staff",
    subItems: [
      { title: "Staff Directory", href: "/dashboard/staff/directory" },
      { title: "Roles & Permissions", href: "/staff/roles" },
      { title: "Staff Schedule", href: "/staff/schedule" },
      { title: "Performance", href: "/staff/performance" },
      { title: "Staff Reports", href: "/staff/reports" },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    href: "/finance",
    subItems: [
      { title: "Invoices", href: "/finance/invoices" },
      { title: "Payments", href: "/finance/payments" },
      { title: "Expenses", href: "/finance/expenses" },
      { title: "Trust Accounts", href: "/finance/trust" },
      { title: "Financial Reports", href: "/finance/reports" },
    ],
  },
  {
    title: "Admin",
    icon: Settings,
    href: "/dashboard/admin",
    subItems: [
      { title: "System Settings", href: "/dashboard/admin/settings" },
      { title: "User Management", href: "/dashboard/admin/users" },
      { title: "Firm Profile", href: "/dashboard/admin/profile" },
      { title: "Integrations", href: "/dashboard/admin/integrations" },
      { title: "Audit Logs", href: "/dashboard/admin/logs" },
    ],
  },

  {
    title: "Approval",
    icon: CheckCircle,
    href: "/approval",
    subItems: [
      { title: "Pending Approvals", href: "/approval/pending" },
      { title: "Approved Items", href: "/approval/approved" },
      { title: "Rejected Items", href: "/approval/rejected" },
      { title: "Approval Workflows", href: "/approval/workflows" },
      { title: "Approval History", href: "/approval/history" },
    ],
  },
  {
    title: "Banking",
    icon: CreditCard,
    href: "/banking",
    subItems: [
      { title: "Bank Accounts", href: "/banking/accounts" },
      { title: "Payment Methods", href: "/banking/methods" },
      { title: "Transaction History", href: "/banking/transactions" },
      { title: "Account Settings", href: "/banking/settings" },
      { title: "Security", href: "/banking/security" },
    ],
  },
];

export function Sidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:static",
          isOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        <div className="flex h-16 items-center justify-center gap-3 border-b border-sidebar-border px-4">
          {isOpen ? (
            <>
              <div className="relative w-28 h-10">
                <Image
                  fill
                  src="/cs-logo-long.png"
                  className="w-40 h-20"
                  alt="Company Log"
                />
              </div>
            </>
          ) : (
            <Scale className="h-6 w-6 text-sidebar-primary" />
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      !isOpen && "justify-center px-0"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {isOpen && (
                      <span className="flex-1 text-left">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
