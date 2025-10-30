"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { useState } from "react"
import { loginAction } from "@/actions/auth/login"
import { toast } from "@/lib/helpers/toast"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      // Call server action
      const result = await loginAction(data.email, data.password)

      if (!result.success) {
        toast.error({
          title: "Login failed",
          description: result.message,
        })
        setIsSubmitting(false)
        return
      }

      toast.success({
        title: "Login successful!",
        description: "Redirecting...",
      })

      // Wait a moment then do a full page reload to redirect
      // This ensures Supabase session is fully established
      setTimeout(() => {
        if (result.redirectTo) {
          window.location.href = result.redirectTo
        } else {
          window.location.href = "/"
        }
      }, 1000)
    } catch (error) {
      console.error("[Login error]", error)
      toast.error({
        title: "Something went wrong",
        description: "Please try again later.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image src="/cs-logo-long.png" alt="CaseStream" width={200} height={45} className="h-10 w-auto" priority />
        </Link>

        {/* Login Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl border-2 border-slate-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-600">Sign in to your account to continue</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-12"
                        disabled={isSubmitting}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12"
                        disabled={isSubmitting}
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-slate-700 hover:text-slate-900">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-slate-700 hover:text-slate-900">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}