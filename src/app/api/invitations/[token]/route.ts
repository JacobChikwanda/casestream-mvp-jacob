import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json(
        { error: "Invitation token is required" },
        { status: 400 }
      );
    }

    // Find the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        account: {
          select: {
            id: true,
            firmName: true,
            address: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invalid invitation token" },
        { status: 404 }
      );
    }

    // Check if invitation is still valid
    if (invitation.status !== "PENDING") {
      return NextResponse.json(
        {
          error: invitation.status === "ACCEPTED"
            ? "This invitation has already been accepted"
            : invitation.status === "EXPIRED"
            ? "This invitation has expired"
            : "This invitation is no longer valid"
        },
        { status: 400 }
      );
    }

    // Check if invitation has expired
    if (new Date() > invitation.expiresAt) {
      // Update status to expired
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: "EXPIRED" },
      });

      return NextResponse.json(
        { error: "This invitation has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      invitation: {
        id: invitation.id,
        email: invitation.email,
        expiresAt: invitation.expiresAt,
        staffData: invitation.staffData,
        account: invitation.account,
        invitedBy: invitation.createdBy,
      },
    });
  } catch (error) {
    console.error("Error fetching invitation:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitation" },
      { status: 500 }
    );
  }
}
