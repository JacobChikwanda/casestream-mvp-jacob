import * as z from "zod";

export const staffSchema = z.object({
  // --- Personal ---
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  phone: z.string().min(1, "Phone is required"),
  workEmail: z.string().email("Invalid work email"),
  workPhone: z.string().min(1, "Work phone is required"),
  extension: z.string().default(""), // ✅ .default("") instead of .min(0)
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).nullable().default(null),
  race: z
    .enum([
      "AMERICAN_INDIAN_ALASKA_NATIVE",
      "ASIAN",
      "BLACK_AFRICAN_AMERICAN",
      "NATIVE_HAWAIIAN_PACIFIC_ISLANDER",
      "CAUCASIAN",
      "HISPANIC_LATINO",
    ])
    .nullable()
    .default(null),

  // --- Address ---
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().default(""),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),

  // --- Emergency ---
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyContactPhone: z
    .string()
    .min(1, "Emergency contact phone is required"),
  emergencyContactEmail: z.string().email("Invalid emergency contact email"),

  // --- Employment ---
  resume: z
    .string()
    .nullable()
    .transform((v) => v ?? ""), // ✅ converts null → ""
  hireDate: z.string().min(1, "Hire date is required"),
  leaveDate: z.string().default(""),
  employmentStatus: z.enum(["ACTIVE", "INACTIVE"]),
  staffGroup: z.enum(["ATTORNEY", "LAW_CLERK", "STAFF", "FIRM_MANAGER"]),
  applicationAdmin: z.boolean().default(false),
  reportingToId: z.string().default(""),

  // --- Compensation ---
  defaultCaseRate: z.string().min(1, "Default case rate is required"),
  payType: z.enum(["SALARY", "HOURLY"]),
  payRate: z.string().min(1, "Pay rate is required"),
  mileageReimbursement: z.string().default("0"),
  enableOvertime: z.boolean().default(false),
  overtimeRate: z.string().default("0"),
  weeklyBaseHours: z.string().default("40"),

  // --- Break ---
  enableAutoBreakDeduction: z.boolean().default(false),
  breaktimeBaseHours: z.string().default("0"),
  breaktimeRate: z.string().default("0"),

  // --- Incentives ---
  enablePerformanceIncentives: z.boolean().default(false),
  intakeStaffIncentive: z.string().default("0"),
  intakeOverrideIncentive: z.string().default("0"),
  managerOverrideIncentive: z.string().default("0"),
  referralIncentive: z.string().default("0"),

  // --- Banking ---
  bankName: z.string().min(1, "Bank name is required"),
  bankRoutingNumber: z.string().min(1, "Routing number is required"),
  bankAccountNumber: z.string().min(1, "Account number is required"),
});

export type StaffFormData = z.infer<typeof staffSchema>;
