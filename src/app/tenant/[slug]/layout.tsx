import React from "react"
import Image from "next/image"
import Link from "next/link"
import SidebarNav from "@/components/app-ui/tenant/sidebar-nav"

interface TenantLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { slug } = await params
  const basePath = `/tenant/${slug}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-white p-4 hidden md:block">
          <Link href={"/dashboard"} className="flex items-center gap-2 px-2 py-2">
            <Image src="/cs-logo.png" alt="CaseStream" width={28} height={28} />
            <span className="text-lg font-semibold">CaseStream</span>
          </Link>
          <div className="mt-6">
            <SidebarNav basePath={basePath} />
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="md:hidden sticky top-0 z-10 border-b bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href={"/dashboard"} className="flex items-center gap-2">
                <Image src="/cs-logo.png" alt="CaseStream" width={24} height={24} />
                <span className="text-base font-semibold">CaseStream</span>
              </Link>
              <span className="text-sm text-gray-500 truncate">{slug}</span>
            </div>
          </header>

          <main className="p-4 md:p-6">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}