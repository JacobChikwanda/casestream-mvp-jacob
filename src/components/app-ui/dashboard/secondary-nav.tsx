"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./sidebar";

export function SecondaryNav() {
  const pathname = usePathname();

  // Find the current section based on pathname
  const currentSection = navItems.find((item) => {
    if (pathname === item.href) return true;
    if (pathname?.startsWith(item.href + "/")) return true;
    return false;
  });

  if (
    !currentSection ||
    !currentSection.subItems ||
    currentSection.subItems.length === 0
  ) {
    return null;
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center gap-1 overflow-x-auto px-6 py-3">
        <span className="mr-3 text-sm font-medium text-muted-foreground">
          {currentSection.title}:
        </span>
        {currentSection.subItems.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {subItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
