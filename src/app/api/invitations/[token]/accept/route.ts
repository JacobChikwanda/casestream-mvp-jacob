import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
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
        { error: "Invitation has already been used or is no longer valid" },
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
        { error: "Invitation has expired" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { password, ...staffData } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Validate required staff data
    const requiredFields = ["name", "email", "phone"];
    for (const field of requiredFields) {
      if (!staffData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create the staff member
    const newStaff = await prisma.staff.create({
      data: {
        accountId: invitation.accountId,
        invitationId: invitation.id,

        // Personal Information
        name: staffData.name,
        email: staffData.email || invitation.email,
        phone: staffData.phone,
        workEmail: invitation.email, // Use invitation email as work email

        // Employment Information
        hireDate: staffData.hireDate ? new Date(staffData.hireDate) : new Date(),
        employmentStatus: "ACTIVE",
        staffGroup: staffData.staffGroup || "STAFF",

        // Address (if provided)
        ...(staffData.addressLine1 && {
          address: {
            line1: staffData.addressLine1,
            line2: staffData.addressLine2 || "",
            city: staffData.city || "",
            state: staffData.state || "",
            zip: staffData.zip || "",
            country: staffData.country || "USA",
          },
        }),

        // Emergency Contact (if provided)
        ...(staffData.emergencyContact && {
          emergencyContact: staffData.emergencyContact,
          emergencyContactPhone: staffData.emergencyContactPhone || "",
          emergencyContactEmail: staffData.emergencyContactEmail || "",
        }),

        // Banking (if provided)
        ...(staffData.bankName && {
          bankName: staffData.bankName,
          bankRoutingNumber: staffData.bankRoutingNumber || "",
          bankAccountNumber: staffData.bankAccountNumber || "",
        }),

        // Audit
        createdById: invitation.createdById,
        updatedById: invitation.createdById,
      },
    });

    // Update invitation status
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        status: "ACCEPTED",
        createdStaff: {
          connect: { id: newStaff.id },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully! You can now log in.",
      staff: {
        id: newStaff.id,
        name: newStaff.name,
        email: newStaff.workEmail,
      },
    });
  } catch (error) {
    console.error("Error accepting invitation:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this work email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to accept invitation" },
      { status: 500 }
    );
  }
}
