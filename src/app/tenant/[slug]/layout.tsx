import React from "react"

interface TenantLayoutProps {
  children: React.ReactNode
}

export default async function TenantLayout({ children }: TenantLayoutProps) {
  return (
    <>{children}</>
  )
}