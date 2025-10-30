"use client";

import { usePathname } from "next/navigation";
import { SecondaryNavItem } from "./secondary-nav-item";
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

        <SecondaryNavItem
          triggerVariant="ghost"
          title="Staff directory"
          links={[
            {
              name: "View directory",
              href: `/tenant/${"slug"}/dashboard/staff/directory`,
            },
          ]}
        />
        <SecondaryNavItem
          triggerVariant="ghost"
          title="Staff directory"
          links={[
            {
              name: "View directory",
              href: `/tenant/${"slug"}/dashboard/staff/directory`,
            },
          ]}
        />
      </div>
    </div>
  );
}
