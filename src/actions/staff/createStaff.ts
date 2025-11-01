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
      staffGroup: clean("staffGroup") as StaffFormData["staffGroup"],
      applicationAdmin: bool("applicationAdmin"),

      defaultCaseRate: clean("defaultCaseRate") ?? "0",
      payType: (clean("payType") ?? "SALARY") as StaffFormData["payType"],
      payRate: clean("payRate") ?? "0",
      mileageReimbursement: clean("mileageReimbursement") ?? "0",
      enableOvertime: bool("enableOvertime"),
      overtimeRate: clean("overtimeRate") ?? "0",
      weeklyBaseHours: clean("weeklyBaseHours") ?? "40",

      enableAutoBreakDeduction: bool("enableAutoBreakDeduction"),
      breaktimeBaseHours: clean("breaktimeBaseHours") ?? "0",
      breaktimeRate: clean("breaktimeRate") ?? "0",

      enablePerformanceIncentives: bool("enablePerformanceIncentives"),
      intakeStaffIncentive: clean("intakeStaffIncentive") ?? "0",
      intakeOverrideIncentive: clean("intakeOverrideIncentive") ?? "0",
      managerOverrideIncentive: clean("managerOverrideIncentive") ?? "0",
      referralIncentive: clean("referralIncentive") ?? "0",

      bankName: clean("bankName") ?? "",
      bankRoutingNumber: clean("bankRoutingNumber") ?? "",
      bankAccountNumber: clean("bankAccountNumber") ?? "",
    };

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

    // 5. Convert numeric strings to numbers safely
    const num = (val: string | number): number => {
      const n = typeof val === "string" ? parseFloat(val) : val;
      return isNaN(n) ? 0 : n;
    };

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

        // Compensation
        defaultCaseRate: num(validated.defaultCaseRate),
        payType: validated.payType,
        payRate: num(validated.payRate),
        mileageReimbursement: num(validated.mileageReimbursement),
        enableOvertime: validated.enableOvertime,
        overtimeRate: num(validated.overtimeRate),
        weeklyBaseHours: num(validated.weeklyBaseHours),

        // Break
        enableAutoBreakDeduction: validated.enableAutoBreakDeduction,
        breaktimeBaseHours: num(validated.breaktimeBaseHours),
        breaktimeRate: num(validated.breaktimeRate),

        // Incentives
        enablePerformanceIncentives: validated.enablePerformanceIncentives,
        intakeStaffIncentive: num(validated.intakeStaffIncentive),
        intakeOverrideIncentive: num(validated.intakeOverrideIncentive),
        managerOverrideIncentive: num(validated.managerOverrideIncentive),
        referralIncentive: num(validated.referralIncentive),

        // Banking
        bankName: validated.bankName,
        bankRoutingNumber: validated.bankRoutingNumber,
        bankAccountNumber: validated.bankAccountNumber,

        // Audit
        createdById: accountId,
        updatedById: accountId,
      },
    });

    // 8. Revalidate cache
    revalidatePath("/staff");

    return {
      success: true,
      message: "Staff member created successfully.",
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
