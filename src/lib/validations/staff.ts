import { z } from "zod";

// Enums matching the schema
export const StaffGroup = z.enum([
  "ATTORNEY",
  "LAW_CLERK",
  "STAFF",
  "FIRM_MANAGER",
]);
export const EmploymentStatus = z.enum(["ACTIVE", "INACTIVE"]);
export const PayType = z.enum(["SALARY", "HOURLY"]);
export const Gender = z.enum(["MALE", "FEMALE", "OTHER"]);
export const Race = z.enum([
  "ASIAN",
  "CAUCASIAN",
  "AFRICAN_AMERICAN",
  "HISPANIC",
  "NATIVE_AMERICAN",
  "PACIFIC_ISLANDER",
  "OTHER",
]);

// Address schema
const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "State is required")
    .max(2, "Use 2-letter state code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  country: z.string().min(1, "Country is required"),
});

// Main staff form schema
export const staffFormSchema = z.object({
  // Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().optional(),
  phone: z.string().regex(/^[\d\s\-()+]+$/, "Invalid phone number"),
  workEmail: z.string().email("Invalid work email address"),
  workPhone: z.string().regex(/^[\d\s\-()+]+$/, "Invalid work phone number"),
  extension: z.string().optional(),
  dob: z.string().min(1, "Date of birth is required"),
  gender: Gender.optional(),
  race: Race.optional(),
  address: addressSchema,
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .regex(/^[\d\s\-()+]+$/, "Invalid emergency contact phone"),
  emergencyContactEmail: z.string().email("Invalid emergency contact email"),
  resume: z.string().optional(),

  // Employment Information
  hireDate: z.string().min(1, "Hire date is required"),
  leaveDate: z.string().optional(),
  employmentStatus: EmploymentStatus,
  staffGroup: StaffGroup,
  applicationAdmin: z.boolean(),
  reportingToId: z.string().optional(),

  // Compensation
  defaultCaseRate: z.coerce.number().min(0, "Rate must be positive"),
  payType: PayType,
  payRate: z.coerce.number().min(0, "Pay rate must be positive"),
  mileageReimbursement: z.coerce
    .number()
    .min(0, "Mileage rate must be positive"),
  enableOvertime: z.boolean(),
  overtimeRate: z.coerce.number().min(0, "Overtime rate must be positive"),
  weeklyBaseHours: z.coerce.number().min(0, "Weekly hours must be positive"),
  enableAutoBreakDeduction: z.boolean(),
  breaktimeBaseHours: z.coerce.number().min(0, "Break hours must be positive"),
  breaktimeRate: z.coerce.number().min(0, "Break rate must be positive"),
  enablePerformanceIncentives: z.boolean(),
  intakeStaffIncentive: z.coerce.number().min(0, "Incentive must be positive"),
  intakeOverrideIncentive: z.coerce
    .number()
    .min(0, "Incentive must be positive"),
  managerOverrideIncentive: z.coerce
    .number()
    .min(0, "Incentive must be positive"),
  referralIncentive: z.coerce.number().min(0, "Incentive must be positive"),

  // Banking Information
  bankName: z.string().min(2, "Bank name is required"),
  bankRoutingNumber: z
    .string()
    .regex(/^\d{9}$/, "Routing number must be 9 digits"),
  bankAccountNumber: z.string().min(4, "Account number is required"),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
