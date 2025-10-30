import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { createSupabaseServerRouteHandler } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account, staffOwner, acceptTerms } = body

    if (!acceptTerms) {
      return NextResponse.json({ message: "You must accept the terms and conditions" }, { status: 400 })
    }

    if (!account?.firmName || !account?.email || !account?.accountSlug) {
      return NextResponse.json({ message: "Missing required account fields" }, { status: 400 })
    }

    if (!staffOwner?.name || !staffOwner?.workEmail || !staffOwner?.password) {
      return NextResponse.json({ message: "Missing required staff owner fields" }, { status: 400 })
    }

    if (staffOwner.password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    const supabase = await createSupabaseServerRouteHandler()

    const existingAccount = await prisma.account.findUnique({
      where: { accountSlug: account.accountSlug },
      select: { id: true },
    })

    if (existingAccount) {
      return NextResponse.json({ message: "Account slug already exists" }, { status: 400 })
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: staffOwner.workEmail,
      password: staffOwner.password,
      email_confirm: true,
      user_metadata: {
        name: staffOwner.name,
        phone: staffOwner.phone,
      },
    })

    if (authError || !authData.user) {
      console.error("[signup] Auth error:", authError)
      return NextResponse.json({ message: authError?.message || "Failed to create user" }, { status: 400 })
    }

    let createdAccount: { id: string; accountSlug: string } | null = null

    try {
      createdAccount = await prisma.account.create({
        data: {
          accountSlug: account.accountSlug,
          firmName: account.firmName,
          email: account.email,
          phone: account.phone || "",
          fax: account.fax || "",
          address: {
            line1: account.address?.line1 || "",
            line2: account.address?.line2 || "",
            city: account.address?.city || "",
            state: account.address?.state || "",
            zip: account.address?.postalCode || "",
            country: account.address?.country || "United States",
          },
          staff: {
            create: {
              name: staffOwner.name,
              email: staffOwner.email || "",
              phone: staffOwner.phone || "",
              workEmail: staffOwner.workEmail,
              workPhone: staffOwner.workPhone || "",
              extension: staffOwner.extension || "",
              dob: staffOwner.dob ? new Date(staffOwner.dob) : new Date(),
              gender: staffOwner.gender || null,
              race: staffOwner.race || null,
              address: {
                line1: staffOwner.address?.line1 || "",
                line2: staffOwner.address?.line2 || "",
                city: staffOwner.address?.city || "",
                state: staffOwner.address?.state || "",
                zip: staffOwner.address?.postalCode || "",
                country: staffOwner.address?.country || "United States",
              },
              hireDate: new Date(),
              employmentStatus: "ACTIVE",
              staffGroup: "FIRM_MANAGER",
              applicationAdmin: true,
              bankName: staffOwner.bankName || "",
              bankRoutingNumber: staffOwner.bankRoutingNumber || "",
              bankAccountNumber: staffOwner.bankAccountNumber || "",
              emergencyContact: staffOwner.emergencyContact || "",
              emergencyContactPhone: staffOwner.emergencyContactPhone || "",
              emergencyContactEmail: staffOwner.emergencyContactEmail || "",
            },
          },
        },
        select: {
          id: true,
          accountSlug: true,
        },
      })

      if (!createdAccount) {
        throw new Error("Failed to create account")
      }

      return NextResponse.json(
        {
          message: "Account created successfully",
          accountSlug: createdAccount.accountSlug,
          redirectTo: `/${createdAccount.accountSlug}/dashboard`,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("[signup] Prisma error, rolling back:", error)

      if (createdAccount) {
        await prisma.account.delete({
          where: { id: createdAccount.id },
        })
      }

      // Delete Supabase auth user
      await supabase.auth.admin.deleteUser(authData.user.id)

      return NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to create account" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[signup] Request error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}