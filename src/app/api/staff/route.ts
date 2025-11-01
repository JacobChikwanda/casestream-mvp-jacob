import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        workEmail: true,
        staffGroup: true,
        applicationAdmin: true,
        accountId: true,
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}
