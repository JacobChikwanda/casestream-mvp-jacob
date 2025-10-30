"use client";

import { usePathname } from "next/navigation";
import { SecondaryNavItem } from "./secondary-nav-item";
import { navItems } from "./sidebar";

export function SecondaryNav() {
  const pathname = usePathname();

  // Find the current section based on pathname
  const currentSelection = navItems.find((item) => {
    if (pathname === item.href) return true;
    if (pathname?.startsWith(item.href + "/")) return true;
    return false;
  });

  if (
    !currentSelection ||
    !currentSelection.subItems ||
    currentSelection.subItems.length === 0
  ) {
    return null;
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center gap-1 overflow-x-auto px-6 py-3">
        <span className="mr-3 text-sm font-medium text-muted-foreground">
          {currentSelection.title}:
        </span>
        <SecondaryNavItem
          key={currentSelection.title}
          triggerVariant="ghost"
          title={currentSelection.title}
          links={currentSelection.subItems}
        />
      </div>
    </div>
  );
}
