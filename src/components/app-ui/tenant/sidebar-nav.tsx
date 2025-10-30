"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarNavProps {
  basePath: string
}

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Cases", href: "cases" },
  { label: "Contacts", href: "contacts" },
  { label: "Documents", href: "documents" },
  { label: "Calendar", href: "calendar" },
  { label: "Tasks", href: "tasks" },
  { label: "Settings", href: "settings" },
]

export default function SidebarNav({ basePath }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ label, href }) => {
        const isTenantPath = pathname?.startsWith("/tenant/")
        const fullPath = isTenantPath ? `${basePath}/${href}` : `/${href}`
        const isActive = pathname === fullPath || pathname?.startsWith(fullPath)

        return (
          <Link
            key={href}
            href={fullPath}
            className={[
              "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            ].join(" ")}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}


