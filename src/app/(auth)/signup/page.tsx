"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { COUNTRIES } from "@/lib/constants/countries"
import { cn } from "@/lib/utils"
import { toast } from "@/lib/helpers/toast"
import { API } from "@/lib/constants/api-paths"

const signupSchema = z.object({
  // Staff Owner fields
  name: z.string().min(2, "Name must be at least 2 characters"),
  workEmail: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  workPhone: z.string().optional(),

  // Account fields
  firmName: z.string().min(2, "Firm name is required"),
  email: z.email("Please enter a valid firm email address"),
  firmPhone: z.string().optional(),
  accountSlug: z.string().min(1, "Account slug is required"),

  // Optional address fields
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  fax: z.string().optional(),

  // Terms acceptance
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showAddress, setShowAddress] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      password: "",
      phone: "",
      workPhone: "",
      firmName: "",
      email: "",
      firmPhone: "",
      accountSlug: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      fax: "",
      acceptTerms: false,
    },
  })

  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug.length < 2) {
      setSlugAvailable(null)
      return
    }

    setIsCheckingSlug(true)
    try {
      const response = await fetch(`/api/auth/check-slug?slug=${encodeURIComponent(slug)}`)
      const data = await response.json()
      setSlugAvailable(data.available)

      if (!data.available) {
        form.setError("accountSlug", {
          type: "manual",
          message: "This account URL is already taken",
        })
      } else {
        form.clearErrors("accountSlug")
      }
    } catch (error) {
      console.error("[v0] Error checking slug:", error)
    } finally {
      setIsCheckingSlug(false)
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "accountSlug" && value.accountSlug) {
        const timeoutId = setTimeout(() => {
          checkSlugAvailability(value.accountSlug!)
        }, 500)
        return () => clearTimeout(timeoutId)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const handleFirmNameBlur = () => {
    const firmName = form.getValues("firmName")
    if (firmName && !form.getValues("accountSlug")) {
      const slug = firmName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      form.setValue("accountSlug", slug)
      checkSlugAvailability(slug)
    }
  }

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        account: {
          firmName: data.firmName,
          email: data.email,
          phone: data.firmPhone || "",
          accountSlug: data.accountSlug,
          address: {
            line1: data.line1 || "",
            line2: data.line2 || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
            country: data.country || "United States",
          },
          fax: data.fax || "",
          logo: "",
        },
        staffOwner: {
          name: data.name,
          workEmail: data.workEmail,
          password: data.password,
          phone: data.phone || "",
          workPhone: data.workPhone || "",
          staffGroup: "FIRM_MANAGER" as const,
          employmentStatus: "ACTIVE" as const,
          hireDate: new Date().toISOString(),
          address: {
            line1: data.line1 || "",
            line2: data.line2 || "",
            city: data.city || "",
            state: data.state || "",
            zip: data.zip || "",
            country: data.country || "United States",
          },
        },
        acceptTerms: data.acceptTerms,
      }

      const response = await fetch(API.AUTH.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      
      const res = await response.json()
      
      if (!response.ok) {
        throw new Error(res.message || "Signup failed")
      }

      toast.success({
        title: "Account created successfully!",
        description: "Welcome to CaseStream. Redirecting to onboarding...",
      })

      router.push("/onboarding")
    } catch (error) {
      toast.error({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image src="/cs-logo-long.png" alt="CaseStream" width={200} height={45} className="h-10 w-auto" priority />
        </Link>

        {/* Signup Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl border-2 border-slate-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your firm account</h1>
            <p className="text-slate-600">Get started with CaseStream today</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="owner" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="owner">Firm Owner</TabsTrigger>
                  <TabsTrigger value="firm">Firm</TabsTrigger>
                </TabsList>

                {/* Firm Owner Tab */}
                <TabsContent value="owner" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="John Doe" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email (Login Email) *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@lawfirm.com" className="h-12" {...field} />
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
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 987-6543" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Firm Tab */}
                <TabsContent value="firm" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firm Name *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Smith & Associates Law Firm"
                            className="h-12"
                            {...field}
                            onBlur={(e) => {
                              field.onBlur()
                              handleFirmNameBlur()
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountSlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account URL *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="flex items-center text-sm text-slate-700 border border-input rounded-md h-12 px-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                              <div className="flex items-center overflow-hidden">
                                <input
                                  type="text"
                                  placeholder="your-firm"
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                                    field.onChange(value)
                                  }}
                                  className="bg-transparent focus:outline-none focus:ring-0 border-none px-0 text-sm w-auto min-w-[60px]"
                                  style={{
                                    width: `${Math.max((field.value?.length || 9) + 1, 9)}ch`,
                                  }}
                                />
                                <span className="text-slate-500 select-none">.casestream.com</span>
                              </div>
                            </div>
                            {isCheckingSlug && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                              </div>
                            )}
                            {!isCheckingSlug && slugAvailable === true && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firm Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@lawfirm.com" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firmPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firm Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Optional Address Section */}
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setShowAddress(!showAddress)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
                    >
                      {showAddress ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      Add firm address (optional)
                    </button>

                    {showAddress && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="line1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 1</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="123 Main Street" className="h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="line2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="Suite 100" className="h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="New York" className="h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="NY" className="h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="10001" className="h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Country</FormLabel>
                                <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "h-12 justify-between font-normal",
                                          !field.value && "text-muted-foreground",
                                        )}
                                      >
                                        {field.value || "Select country"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[280px] p-0" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search country..." />
                                      <CommandList>
                                        <CommandEmpty>No country found.</CommandEmpty>
                                        <CommandGroup>
                                          {COUNTRIES.map((country) => (
                                            <CommandItem
                                              key={country}
                                              value={country}
                                              onSelect={() => {
                                                form.setValue("country", country)
                                                setCountryOpen(false)
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  field.value === country ? "opacity-100" : "opacity-0",
                                                )}
                                              />
                                              {country}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal text-slate-700">
                        I agree to the{" "}
                        <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
