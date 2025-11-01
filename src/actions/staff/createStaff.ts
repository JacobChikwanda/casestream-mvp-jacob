"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { staffSchema, type StaffFormData } from "@/lib/validations/staff";
import type {
  ActionState,
  ServerActionResult,
} from "@/lib/types/server-action";
import { prisma } from "@/lib/db";

type CreateStaffState = ActionState<StaffFormData>;

/**
 * Server Action – Creates a new staff member
 * @param accountId - The ID of the account/user performing the action (passed from the client/session)
 * @param prevState - Previous form state (for useActionState)
 * @param formData - Form data from the client
 */
export async function createStaffAction(
  accountId: string, // <-- New required parameter
  prevState: CreateStaffState | null,
  formData: FormData
): Promise<ServerActionResult<StaffFormData>> {
  try {
    // Check for accountId immediately
    if (!accountId) {
      return {
        success: false,
        message: "Account ID is required for authorization.",
      };
    }

    // NOTE: Removed accountId extraction from formData

    // Parse and clean FormData
    const rawData = Object.fromEntries(formData.entries());

    // Helper to clean string values
    const cleanString = (key: string): string | null => {
      const value = rawData[key];
      if (typeof value !== "string" || value.trim() === "") return null;
      return value.trim();
    };

    // Helper to parse boolean values
    const parseBoolean = (key: string): boolean => {
      const val = rawData[key];
      if (typeof val === "string") {
        const normalized = val.trim().toLowerCase();
        return (
          normalized === "true" || normalized === "1" || normalized === "on"
        );
      }
      return false;
    };

    // Build typed data object
    const data: StaffFormData = {
      // Personal
      name: cleanString("name") ?? "",
      email: cleanString("email") ?? "",
      phone: cleanString("phone") ?? "",
      workEmail: cleanString("workEmail") ?? "",
      workPhone: cleanString("workPhone") ?? "",
      extension: cleanString("extension") ?? "",
      dob: cleanString("dob") ?? "",
      gender: cleanString("gender") as StaffFormData["gender"],
      race: cleanString("race") as StaffFormData["race"],

      // Address
      addressLine1: cleanString("addressLine1") ?? "",
      addressLine2: cleanString("addressLine2") ?? "",
      city: cleanString("city") ?? "",
      state: cleanString("state") ?? "",
      zip: cleanString("zip") ?? "",
      country: cleanString("country") ?? "",

      // Emergency
      emergencyContact: cleanString("emergencyContact") ?? "",
      emergencyContactPhone: cleanString("emergencyContactPhone") ?? "",
      emergencyContactEmail: cleanString("emergencyContactEmail") ?? "",

      // Employment
      resume: cleanString("resume") ?? "",
      hireDate: cleanString("hireDate") ?? "",
      leaveDate: cleanString("leaveDate") ?? "",
      employmentStatus: (cleanString("employmentStatus") ??
        "ACTIVE") as StaffFormData["employmentStatus"],
      staffGroup: cleanString("staffGroup") as StaffFormData["staffGroup"],
      applicationAdmin: parseBoolean("applicationAdmin"),
      reportingToId: cleanString("reportingToId") ?? "",

      // Compensation
      defaultCaseRate: cleanString("defaultCaseRate") ?? "0",
      payType: (cleanString("payType") ?? "SALARY") as StaffFormData["payType"],
      payRate: cleanString("payRate") ?? "0",
      mileageReimbursement: cleanString("mileageReimbursement") ?? "0",
      enableOvertime: parseBoolean("enableOvertime"),
      overtimeRate: cleanString("overtimeRate") ?? "0",
      weeklyBaseHours: cleanString("weeklyBaseHours") ?? "40",

      // Break
      enableAutoBreakDeduction: parseBoolean("enableAutoBreakDeduction"),
      breaktimeBaseHours: cleanString("breaktimeBaseHours") ?? "0",
      breaktimeRate: cleanString("breaktimeRate") ?? "0",

      // Incentives
      enablePerformanceIncentives: parseBoolean("enablePerformanceIncentives"),
      intakeStaffIncentive: cleanString("intakeStaffIncentive") ?? "0",
      intakeOverrideIncentive: cleanString("intakeOverrideIncentive") ?? "0",
      managerOverrideIncentive: cleanString("managerOverrideIncentive") ?? "0",
      referralIncentive: cleanString("referralIncentive") ?? "0",

      // Banking
      bankName: cleanString("bankName") ?? "",
      bankRoutingNumber: cleanString("bankRoutingNumber") ?? "",
      bankAccountNumber: cleanString("bankAccountNumber") ?? "",
    };

    console.log("[createStaffAction] Creating new staff with data:", data);

    // Validate with Zod
    const parsed = staffSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: parsed.error.format(),
      };
    }

    const validated = parsed.data;

    // Helper – Safe decimal conversion
    const toDecimal = (value: string | number): number => {
      const num = typeof value === "string" ? Number.parseFloat(value) : value;
      return isNaN(num) ? 0 : num;
    };

    // Prepare address JSON
    const addressJson: Prisma.JsonObject = {
      line1: validated.addressLine1,
      line2: validated.addressLine2 || "",
      city: validated.city,
      state: validated.state,
      zip: validated.zip,
      country: validated.country,
    };

    // Create Staff Record
    const newStaff = await prisma.staff.create({
      data: {
        accountId, // <-- Use the passed accountId

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
        address: addressJson,

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
        reportingToId: validated.reportingToId || null,
        resume: validated.resume || null,

        // Compensation
        defaultCaseRate: toDecimal(validated.defaultCaseRate),
        payType: validated.payType,
        payRate: toDecimal(validated.payRate),
        mileageReimbursement: toDecimal(validated.mileageReimbursement),
        enableOvertime: validated.enableOvertime,
        overtimeRate: toDecimal(validated.overtimeRate),
        weeklyBaseHours: toDecimal(validated.weeklyBaseHours),

        // Break
        enableAutoBreakDeduction: validated.enableAutoBreakDeduction,
        breaktimeBaseHours: toDecimal(validated.breaktimeBaseHours),
        breaktimeRate: toDecimal(validated.breaktimeRate),

        // Incentives
        enablePerformanceIncentives: validated.enablePerformanceIncentives,
        intakeStaffIncentive: toDecimal(validated.intakeStaffIncentive),
        intakeOverrideIncentive: toDecimal(validated.intakeOverrideIncentive),
        managerOverrideIncentive: toDecimal(validated.managerOverrideIncentive),
        referralIncentive: toDecimal(validated.referralIncentive),

        // Banking
        bankName: validated.bankName,
        bankRoutingNumber: validated.bankRoutingNumber,
        bankAccountNumber: validated.bankAccountNumber,

        // Audit
        createdById: accountId, // <-- Use the passed accountId
        updatedById: accountId, // <-- Use the passed accountId
      },
    });

    console.log("[createStaffAction] New Staff Created:", newStaff);

    // Revalidate and Redirect
    revalidatePath("/staff");
    redirect("/staff");
  } catch (error) {
    // Error Handling
    console.error("[createStaffAction] Error:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === "P2002") {
        const field = (error.meta?.target as string[])?.[0] ?? "field";
        return {
          success: false,
          message: `A staff member with this ${field} already exists.`,
        };
      }

      // Foreign key constraint violation
      if (error.code === "P2003") {
        return {
          success: false,
          message:
            "Invalid reference to another record. Please check your input.",
        };
      }
    }

    // Handle validation errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        message: "Invalid data format. Please check your input.",
      };
    }

    // Generic error
    return {
      success: false,
      message: "Failed to create staff member. Please try again.",
    };
  }
}
