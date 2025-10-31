// src/components/staff/schema.ts
import * as z from "zod";

export const staffSchema = z.object({
  // Personal
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  workEmail: z.string().email("Invalid work email"),
  workPhone: z.string().min(1, "Work phone is required"),
  extension: z.string().optional(),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", ""]).optional(),
  race: z
    .enum([
      "ASIAN",
      "BLACK",
      "CAUCASIAN",
      "HISPANIC",
      "NATIVE_AMERICAN",
      "PACIFIC_ISLANDER",
      "OTHER",
      "",
    ])
    .optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyContactPhone: z
    .string()
    .min(1, "Emergency contact phone is required"),
  emergencyContactEmail: z.string().email("Invalid emergency contact email"),
  resume: z.string().optional(),

  // Employment
  hireDate: z.string().min(1, "Hire date is required"),
  leaveDate: z.string().optional(),
  employmentStatus: z.enum(["ACTIVE", "INACTIVE"]),
  staffGroup: z.enum(["ATTORNEY", "LAW_CLERK", "STAFF", "FIRM_MANAGER"]),
  applicationAdmin: z.boolean(),
  reportingToId: z.string().optional(),

  // Compensation
  defaultCaseRate: z.string().min(1, "Default case rate is required"),
  payType: z.enum(["SALARY", "HOURLY"]),
  payRate: z.string().min(1, "Pay rate is required"),
  mileageReimbursement: z.string().min(1, "Mileage reimbursement is required"),
  enableOvertime: z.boolean(),
  overtimeRate: z.string(),
  weeklyBaseHours: z.string(),
  enableAutoBreakDeduction: z.boolean(),
  breaktimeBaseHours: z.string(),
  breaktimeRate: z.string(),
  enablePerformanceIncentives: z.boolean(),
  intakeStaffIncentive: z.string(),
  intakeOverrideIncentive: z.string(),
  managerOverrideIncentive: z.string(),
  referralIncentive: z.string(),

  // Banking
  bankName: z.string().min(1, "Bank name is required"),
  bankRoutingNumber: z.string().min(1, "Routing number is required"),
  bankAccountNumber: z.string().min(1, "Account number is required"),
});

/**
 *  THIS LINE IS CRITICAL
 */
export type StaffFormData = z.infer<typeof staffSchema>;
