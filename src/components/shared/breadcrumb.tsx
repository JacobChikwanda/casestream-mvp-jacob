"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { navItems } from "@/components/app-ui/dashboard/sidebar";
export function Breadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname?.split("/").filter(Boolean) || [];
    const breadcrumbs: { label: string; href: string }[] = [
      { label: "Home", href: "/" },
    ];

    let currentPath = "";

    for (let i = 0; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;

      // Try to find a matching nav item
      const navItem = navItems.find((item) => item.href === currentPath);

      if (navItem) {
        breadcrumbs.push({
          label: navItem.title,
          href: navItem.href,
        });

        // Check if there's a sub-item match
        if (i < paths.length - 1) {
          const remainingPath = paths.slice(i + 1).join("/");
          const subItem = navItem.subItems?.find(
            (sub) => sub.href === currentPath + "/" + remainingPath
          );

          if (subItem) {
            breadcrumbs.push({
              label: subItem.title,
              href: subItem.href,
            });
            break;
          }
        }
      } else {
        // Fallback: capitalize the path segment
        const label = paths[i]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index === 0 ? (
            <Link
              href={crumb.href}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">{crumb.label}</span>
            </Link>
          ) : (
            <>
              <ChevronRight className="h-4 w-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
