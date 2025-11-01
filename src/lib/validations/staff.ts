import * as z from "zod";

export const staffSchema = z.object({
  // --- Personal ---
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email").or(z.literal("")).optional(),
  phone: z.string().min(1, "Phone is required"),
  workEmail: z.email("Invalid work email"),
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
  emergencyContactEmail: z.email("Invalid emergency contact email"),

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
  reportingToId: z.string().default("").optional(),

  // --- Compensation ---
  defaultCaseRate: z.coerce
    .number()
    .min(0, "Default case rate must be non-negative")
    .max(99999999.99, "Default case rate cannot exceed 99,999,999.99"),
  payType: z.enum(["SALARY", "HOURLY"]),
  payRate: z.coerce
    .number()
    .min(0, "Pay rate must be non-negative")
    .max(99999999.99, "Pay rate cannot exceed 99,999,999.99"),
  mileageReimbursement: z.coerce
    .number()
    .min(0, "Mileage reimbursement must be non-negative")
    .max(99999999.99, "Mileage reimbursement cannot exceed 99,999,999.99")
    .default(0),
  enableOvertime: z.boolean().default(false),
  overtimeRate: z.coerce
    .number()
    .min(0, "Overtime rate must be non-negative")
    .max(99999999.99, "Overtime rate cannot exceed 99,999,999.99")
    .default(0),
  weeklyBaseHours: z.coerce
    .number()
    .min(0, "Weekly base hours must be non-negative")
    .max(999.99, "Weekly base hours cannot exceed 999.99")
    .default(40),

  // --- Break ---
  enableAutoBreakDeduction: z.boolean().default(false),
  breaktimeBaseHours: z.coerce
    .number()
    .min(0, "Break time base hours must be non-negative")
    .max(999.99, "Break time base hours cannot exceed 999.99")
    .default(0),
  breaktimeRate: z.coerce
    .number()
    .min(0, "Break time rate must be non-negative")
    .max(99999999.99, "Break time rate cannot exceed 99,999,999.99")
    .default(0),

  // --- Incentives ---
  enablePerformanceIncentives: z.boolean().default(false),
  intakeStaffIncentive: z.coerce
    .number()
    .min(0, "Intake staff incentive must be non-negative")
    .max(99999999.99, "Intake staff incentive cannot exceed 99,999,999.99")
    .default(0),
  intakeOverrideIncentive: z.coerce
    .number()
    .min(0, "Intake override incentive must be non-negative")
    .max(99999999.99, "Intake override incentive cannot exceed 99,999,999.99")
    .default(0),
  managerOverrideIncentive: z.coerce
    .number()
    .min(0, "Manager override incentive must be non-negative")
    .max(99999999.99, "Manager override incentive cannot exceed 99,999,999.99")
    .default(0),
  referralIncentive: z.coerce
    .number()
    .min(0, "Referral incentive must be non-negative")
    .max(99999999.99, "Referral incentive cannot exceed 99,999,999.99")
    .default(0),

  // --- Banking ---
  bankName: z.string().min(1, "Bank name is required"),
  bankRoutingNumber: z.string().min(1, "Routing number is required"),
  bankAccountNumber: z.string().min(1, "Account number is required"),
});

export type StaffFormData = z.infer<typeof staffSchema>;
