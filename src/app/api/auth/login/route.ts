import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerRouteHandler } from "@/lib/supabase";
import { prisma } from "@/lib/db";
import { getTenantUrl } from "@/lib/helpers/tenant";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerRouteHandler();

    // Sign in with Supabase
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Get user's staff record from Prisma to find their account
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authData.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        workEmail: true,
        staffGroup: true,
        applicationAdmin: true,
        account: {
          select: {
            id: true,
            accountSlug: true,
            firmName: true,
          },
        },
      },
    });

    if (!staffRecord || !staffRecord.account) {
      return NextResponse.json(
        { message: "User not associated with any account" },
        { status: 404 }
      );
    }

    const accountSlug = staffRecord.account.accountSlug;

    // Determine redirect based on role
    const pathname = "/dashboard";
    const redirectTo = getTenantUrl(accountSlug, pathname);

    return NextResponse.json(
      {
        message: "Login successful",
        redirectTo,
        user: {
          id: staffRecord.id,
          name: staffRecord.name,
          email: staffRecord.workEmail,
          accountId: staffRecord.account.id,
          accountSlug: staffRecord.account.accountSlug,
          staffGroup: staffRecord.staffGroup,
          applicationAdmin: staffRecord.applicationAdmin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[login] Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
