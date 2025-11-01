import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/supabase";
import { sendStaffInvitation } from "@/lib/email";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authUser = await getCurrentUser();
    if (!authUser?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get account ID
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authUser.id },
      select: { account: { select: { id: true } } },
    });

    const accountId = staffRecord?.account.id;
    if (!accountId) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { email, staffData } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if invitation already exists and is pending
    const existingInvitation = await prisma.invitation.findUnique({
      where: {
        accountId_email: {
          accountId,
          email,
        },
      },
    });

    if (existingInvitation && existingInvitation.status === "PENDING") {
      // Resend existing invitation
      await sendStaffInvitation({
        name: staffData?.name || "New Staff Member",
        workEmail: email,
        inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${existingInvitation.token}`,
      });

      return NextResponse.json({
        success: true,
        message: "Invitation resent successfully",
        invitation: {
          id: existingInvitation.id,
          email: existingInvitation.email,
          status: existingInvitation.status,
          expiresAt: existingInvitation.expiresAt,
        },
      });
    }

    // Generate secure token
    const token = randomBytes(32).toString("hex");

    // Create invitation (expires in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await prisma.invitation.create({
      data: {
        accountId,
        createdById: authUser.id,
        email,
        token,
        expiresAt,
        staffData,
      },
    });

    // Send invitation email
    try {
      await sendStaffInvitation({
        name: staffData?.name || "New Staff Member",
        workEmail: email,
        inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${token}`,
      });
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError);
      // Don't fail the invitation creation if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Invitation created and sent successfully",
      invitation: {
        id: invitation.id,
        email: invitation.email,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (error) {
    console.error("Error creating invitation:", error);
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authUser = await getCurrentUser();
    if (!authUser?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get account ID
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authUser.id },
      select: { account: { select: { id: true } } },
    });

    const accountId = staffRecord?.account.id;
    if (!accountId) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    // Get all invitations for the account
    const invitations = await prisma.invitation.findMany({
      where: { accountId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        status: true,
        expiresAt: true,
        createdAt: true,
        createdStaff: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      invitations,
    });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitations" },
      { status: 500 }
    );
  }
}
