import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServerRouteHandler } from "@/lib/supabase";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerRouteHandler();

    // Get current session
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch full user data from Prisma
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authUser.id },
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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
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
      { status: 200 },
    );
  } catch (error) {
    console.error("[/api/auth/me] Error:", error);
    return NextResponse.json({ message: "Internal server error" }, {
      status: 500,
    });
  }
}
