"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { staffSchema, type StaffFormData } from "@/lib/validations/staff";
import type {
  ActionState,
  ServerActionResult,
} from "@/lib/types/server-action";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/supabase";
import { sendStaffInvitation } from "@/lib/email";

type CreateStaffState = ActionState<StaffFormData>;

/**
 * Server Action – Creates a new staff member
 */
export async function createStaffAction(
  prevState: CreateStaffState | null,
  formData: FormData
): Promise<ServerActionResult<StaffFormData>> {
  try {
    // 1. Authenticate user
    const authUser = await getCurrentUser();
    if (!authUser?.id) {
      return {
        success: false,
        message: "Unauthorized: User not authenticated.",
      };
    }

    // 2. Get accountId from current staff's account
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authUser.id },
      select: { account: { select: { id: true } } },
    });

    const accountId = staffRecord?.account.id;

    console.log("Account ID in createStaffAction:", accountId);
    if (!accountId) {
      return {
        success: false,
        message: "Account not found for the authenticated user.",
      };
    }

    // 3. Parse and clean form data
    const raw = Object.fromEntries(formData.entries());

    const clean = (key: string): string | null => {
      const val = raw[key];
      return typeof val === "string" && val.trim() !== "" ? val.trim() : null;
    };

    const bool = (key: string): boolean => {
      const val = raw[key];
      return typeof val === "string"
        ? ["true", "1", "on"].includes(val.trim().toLowerCase())
        : false;
    };

    const num = (key: string, defaultValue: number = 0): number => {
      const val = raw[key];
      if (typeof val === "string") {
        const n = parseFloat(val.trim());
        return isNaN(n) ? defaultValue : n;
      }
      return defaultValue;
    };

    const data: StaffFormData = {
      name: clean("name") ?? "",
      email: clean("email") ?? "",
      phone: clean("phone") ?? "",
      workEmail: clean("workEmail") ?? "",
      workPhone: clean("workPhone") ?? "",
      extension: clean("extension") ?? "",
      dob: clean("dob") ?? "",
      gender: clean("gender") as StaffFormData["gender"],
      race: clean("race") as StaffFormData["race"],

      addressLine1: clean("addressLine1") ?? "",
      addressLine2: clean("addressLine2") ?? "",
      city: clean("city") ?? "",
      state: clean("state") ?? "",
      zip: clean("zip") ?? "",
      country: clean("country") ?? "",

      emergencyContact: clean("emergencyContact") ?? "",
      emergencyContactPhone: clean("emergencyContactPhone") ?? "",
      emergencyContactEmail: clean("emergencyContactEmail") ?? "",

      resume: clean("resume") ?? "",
      hireDate: clean("hireDate") ?? "",
      leaveDate: clean("leaveDate") ?? "",
      employmentStatus: (clean("employmentStatus") ??
        "ACTIVE") as StaffFormData["employmentStatus"],
      staffGroup: (clean("staffGroup") ??
        "STAFF") as StaffFormData["staffGroup"],
      applicationAdmin: bool("applicationAdmin"),
      reportingToId: clean("reportingToId") ?? "",

      defaultCaseRate: num("defaultCaseRate", 0),
      payType: (clean("payType") ?? "SALARY") as StaffFormData["payType"],
      payRate: num("payRate", 0),
      mileageReimbursement: num("mileageReimbursement", 0),
      enableOvertime: bool("enableOvertime"),
      overtimeRate: num("overtimeRate", 0),
      weeklyBaseHours: num("weeklyBaseHours", 40),

      enableAutoBreakDeduction: bool("enableAutoBreakDeduction"),
      breaktimeBaseHours: num("breaktimeBaseHours", 0),
      breaktimeRate: num("breaktimeRate", 0),

      enablePerformanceIncentives: bool("enablePerformanceIncentives"),
      intakeStaffIncentive: num("intakeStaffIncentive", 0),
      intakeOverrideIncentive: num("intakeOverrideIncentive", 0),
      managerOverrideIncentive: num("managerOverrideIncentive", 0),
      referralIncentive: num("referralIncentive", 0),

      bankName: clean("bankName") ?? "",
      bankRoutingNumber: clean("bankRoutingNumber") ?? "",
      bankAccountNumber: clean("bankAccountNumber") ?? "",
    };

    console.log("Cleaned form data:", data);

    // 4. Validate with Zod
    const parsed = staffSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the errors below.",
        errors: parsed.error.format(),
      };
    }

    const validated = parsed.data;

    // 5. Data is now properly typed from validation

    // 6. Build address JSON
    const address: Prisma.JsonObject = {
      line1: validated.addressLine1,
      line2: validated.addressLine2 || "",
      city: validated.city,
      state: validated.state,
      zip: validated.zip,
      country: validated.country,
    };

    // 7. Create staff record
    await prisma.staff.create({
      data: {
        accountId,

        // Personal
        name: validated.name,
        email: validated.email || "",
        phone: validated.phone,
        workEmail: validated.workEmail,
        workPhone: validated.workPhone,
        extension: validated.extension || "",
        dob: new Date(validated.dob),
        gender: validated.gender || null,
        race: validated.race || null,
        address,

        // Emergency
        emergencyContact: validated.emergencyContact,
        emergencyContactPhone: validated.emergencyContactPhone,
        emergencyContactEmail: validated.emergencyContactEmail,

        // Employment
        hireDate: new Date(validated.hireDate),
        leaveDate: validated.leaveDate ? new Date(validated.leaveDate) : null,
        employmentStatus: validated.employmentStatus,
        staffGroup: validated.staffGroup,
        applicationAdmin: validated.applicationAdmin,
        resume: validated.resume ?? "",
        reportingToId: validated.reportingToId || null,

        // Compensation
        defaultCaseRate: validated.defaultCaseRate,
        payType: validated.payType,
        payRate: validated.payRate,
        mileageReimbursement: validated.mileageReimbursement,
        enableOvertime: validated.enableOvertime,
        overtimeRate: validated.overtimeRate,
        weeklyBaseHours: validated.weeklyBaseHours,

        // Break
        enableAutoBreakDeduction: validated.enableAutoBreakDeduction,
        breaktimeBaseHours: validated.breaktimeBaseHours,
        breaktimeRate: validated.breaktimeRate,

        // Incentives
        enablePerformanceIncentives: validated.enablePerformanceIncentives,
        intakeStaffIncentive: validated.intakeStaffIncentive,
        intakeOverrideIncentive: validated.intakeOverrideIncentive,
        managerOverrideIncentive: validated.managerOverrideIncentive,
        referralIncentive: validated.referralIncentive,

        // Banking
        bankName: validated.bankName,
        bankRoutingNumber: validated.bankRoutingNumber,
        bankAccountNumber: validated.bankAccountNumber,

        // Audit
        // createdById: accountId,
        // updatedById: accountId,
      },
    });

    // 8. Send invitation email (if workEmail is provided)
    let emailSent = false;
    if (validated.workEmail) {
      try {
        await sendStaffInvitation({
          name: validated.name,
          workEmail: validated.workEmail,
          companyName: "CaseStream", // You can make this configurable later
        });
        emailSent = true;
      } catch (emailError) {
        // Log email error but don't fail the staff creation
        console.error(
          "[createStaffAction] Failed to send invitation email:",
          emailError
        );
      }
    }

    // 9. Revalidate cache
    revalidatePath("/staff");

    return {
      success: true,
      message: emailSent
        ? "Staff member created successfully. Invitation email sent."
        : "Staff member created successfully.",
    };
  } catch (error) {
    // 9. Centralized error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.target as string[])?.[0] ?? "this field";
        return {
          success: false,
          message: `A staff member with the same ${field} already exists.`,
        };
      }

      if (error.code === "P2003") {
        return {
          success: false,
          message: "Invalid reference. The selected record does not exist.",
        };
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        message: "Invalid data format. Please check your input.",
      };
    }

    console.error("[createStaffAction] Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
