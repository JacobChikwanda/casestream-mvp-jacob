import { prisma } from "@/lib/db";
import { staffSelect } from "@/lib/db/selects/staffSelect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      select: staffSelect,
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
