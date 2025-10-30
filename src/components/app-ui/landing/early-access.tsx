"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function EarlyAccess() {
  return (
    <section className="py-24 lg:py-32 bg-linear-to-b from-slate-50 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">{/* Removed blur effects */}</div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span>Start Your Free Trial</span>
            </div>

            <h2 className="text-4xl font-bold text-slate-900 lg:text-5xl text-balance">
              Ready to transform your practice?
            </h2>

            <p className="text-xl text-slate-600 text-pretty max-w-2xl mx-auto">
              Join forward-thinking law firms who are modernizing their case management. Start your 14-day free trial
              today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 px-8 text-base shadow-lg shadow-blue-500/30"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 pt-6">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
