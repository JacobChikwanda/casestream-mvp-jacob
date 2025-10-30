"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"

export function Header() {

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault()
    toast("Coming Soon", {
      description: "This feature will be available shortly.",
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/cs-logo-long.png"
              alt="CaseStream"
              width={180}
              height={40}
              className="h-8 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={handleComingSoon}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={handleComingSoon}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              onClick={handleComingSoon}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
