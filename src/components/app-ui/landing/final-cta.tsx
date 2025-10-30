import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 bg-linear-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white shadow-lg mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Start Your Free Trial Today</span>
          </div>

          <h2 className="text-4xl font-bold text-white lg:text-6xl text-balance leading-tight">
            Ready to transform your legal practice?
          </h2>
          <p className="text-xl text-blue-100 text-pretty max-w-2xl mx-auto">
            Start managing your cases more efficiently with modern tools designed for law firms.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row justify-center pt-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl h-14 px-8 text-base font-semibold group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm h-14 px-8 text-base font-semibold"
            >
              Schedule a Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium">Cancel anytime</span>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
