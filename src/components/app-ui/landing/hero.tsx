"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-blue-50/30 to-white pt-36 pb-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              <Sparkles className="h-4 w-4" />
              <span>Modern Legal Case Management</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-7xl text-balance">
              Streamline Your Legal Practice
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed text-pretty">
              Powerful case management, time tracking, and client collaboration tools designed for modern law firms.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 h-14 px-8 text-base group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-medium">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>

          <div className="relative animate-float">
            {/* Main dashboard card */}
            <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-slate-200/50">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Active Cases</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage your entire caseload</p>
                </div>
                <div className="rounded-2xl bg-linear-to-br from-green-400 to-emerald-500 px-4 py-2 shadow-lg shadow-green-500/30">
                  <p className="text-xs font-semibold text-white">24 Active</p>
                </div>
              </div>

              {/* Case cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-linear-to-br from-blue-50 to-blue-100/50 p-5 border border-blue-200/50 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <span className="text-xl font-bold text-white">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-base">Johnson v. Smith</p>
                      <p className="text-sm text-slate-600">Civil Litigation • Due in 5 days</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white">Active</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-linear-to-br from-purple-50 to-purple-100/50 p-5 border border-purple-200/50 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <span className="text-xl font-bold text-white">ED</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-base">Estate Planning - Davis</p>
                      <p className="text-sm text-slate-600">Estate Law • Review pending</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white">
                    Review
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-linear-to-br from-teal-50 to-teal-100/50 p-5 border border-teal-200/50 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <span className="text-xl font-bold text-white">TC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-base">Corporate Merger - TechCo</p>
                      <p className="text-sm text-slate-600">Corporate Law • In progress</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white">Active</span>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute -right-6 top-20 rounded-2xl bg-white p-4 shadow-xl border border-slate-200/50 animate-float-delayed hidden lg:block">
              <p className="text-xs font-medium text-slate-500 mb-1">Billable Hours</p>
              <p className="text-2xl font-bold text-slate-900">142.5</p>
              <p className="text-xs text-green-600 font-medium mt-1">↑ 12% this week</p>
            </div>

            <div className="absolute -left-6 bottom-20 rounded-2xl bg-white p-4 shadow-xl border border-slate-200/50 animate-float hidden lg:block">
              <p className="text-xs font-medium text-slate-500 mb-1">Client Satisfaction</p>
              <p className="text-2xl font-bold text-slate-900">98%</p>
              <p className="text-xs text-green-600 font-medium mt-1">⭐ Excellent</p>
            </div>

            {/* Decorative blur elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-400/20 blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
