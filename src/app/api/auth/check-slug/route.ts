import { prisma } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, {
        status: 400,
      });
    }

    // Check if slug exists in database
    const existingAccount = await prisma.account.findUnique({
      where: { accountSlug: slug },
      select: { id: true },
    });

    return NextResponse.json({
      available: !existingAccount,
      slug,
    });
  } catch (error) {
    console.error("[v0] Error checking slug:", error);
    return NextResponse.json({ error: "Failed to check slug availability" }, {
      status: 500,
    });
  }
}
