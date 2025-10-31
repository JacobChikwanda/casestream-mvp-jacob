"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Zod schema for validation
const staffSchema = z.object({
  // Personal Information
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  workEmail: z.email("Invalid work email"),
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

  // Employment Information
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

  // Banking Information
  bankName: z.string().min(1, "Bank name is required"),
  bankRoutingNumber: z.string().min(1, "Routing number is required"),
  bankAccountNumber: z.string().min(1, "Account number is required"),
});

type StaffFormData = z.infer<typeof staffSchema>;

export function StaffForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      employmentStatus: "ACTIVE",
      staffGroup: "STAFF",
      applicationAdmin: false,
      defaultCaseRate: "0",
      payType: "HOURLY",
      payRate: "0",
      mileageReimbursement: "0",
      enableOvertime: false,
      overtimeRate: "0",
      weeklyBaseHours: "40",
      enableAutoBreakDeduction: false,
      breaktimeBaseHours: "0",
      breaktimeRate: "0",
      enablePerformanceIncentives: false,
      intakeStaffIncentive: "0",
      intakeOverrideIncentive: "0",
      managerOverrideIncentive: "0",
      referralIncentive: "0",
      country: "USA",
    },
  });

  const onSubmit = (data: StaffFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const enableOvertime = watch("enableOvertime");
  const enableAutoBreakDeduction = watch("enableAutoBreakDeduction");
  const enablePerformanceIncentives = watch("enablePerformanceIncentives");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input id="dob" type="date" {...register("dob")} />
              {errors.dob && (
                <p className="text-sm text-destructive">{errors.dob.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Personal Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Personal Phone *</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEmail">Work Email *</Label>
              <Input id="workEmail" type="email" {...register("workEmail")} />
              {errors.workEmail && (
                <p className="text-sm text-destructive">
                  {errors.workEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPhone">Work Phone *</Label>
              <Input id="workPhone" type="tel" {...register("workPhone")} />
              {errors.workPhone && (
                <p className="text-sm text-destructive">
                  {errors.workPhone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="extension">Extension</Label>
              <Input id="extension" {...register("extension")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => setValue("gender", value as any)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="race">Race</Label>
              <Select onValueChange={(value) => setValue("race", value as any)}>
                <SelectTrigger id="race">
                  <SelectValue placeholder="Select race" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASIAN">Asian</SelectItem>
                  <SelectItem value="BLACK">Black</SelectItem>
                  <SelectItem value="CAUCASIAN">Caucasian</SelectItem>
                  <SelectItem value="HISPANIC">Hispanic</SelectItem>
                  <SelectItem value="NATIVE_AMERICAN">
                    Native American
                  </SelectItem>
                  <SelectItem value="PACIFIC_ISLANDER">
                    Pacific Islander
                  </SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input id="addressLine1" {...register("addressLine1")} />
                {errors.addressLine1 && (
                  <p className="text-sm text-destructive">
                    {errors.addressLine1.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" {...register("addressLine2")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-sm text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input id="state" {...register("state")} />
                {errors.state && (
                  <p className="text-sm text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input id="zip" {...register("zip")} />
                {errors.zip && (
                  <p className="text-sm text-destructive">
                    {errors.zip.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register("country")}
                  defaultValue="USA"
                />
                {errors.country && (
                  <p className="text-sm text-destructive">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  {...register("emergencyContact")}
                />
                {errors.emergencyContact && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  {...register("emergencyContactPhone")}
                />
                {errors.emergencyContactPhone && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContactPhone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactEmail">Contact Email *</Label>
                <Input
                  id="emergencyContactEmail"
                  type="email"
                  {...register("emergencyContactEmail")}
                />
                {errors.emergencyContactEmail && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContactEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume URL</Label>
                <Input
                  id="resume"
                  {...register("resume")}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Employment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input id="hireDate" type="date" {...register("hireDate")} />
              {errors.hireDate && (
                <p className="text-sm text-destructive">
                  {errors.hireDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leaveDate">Leave Date</Label>
              <Input id="leaveDate" type="date" {...register("leaveDate")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("employmentStatus", value as any)
                }
                defaultValue="ACTIVE"
              >
                <SelectTrigger id="employmentStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentStatus && (
                <p className="text-sm text-destructive">
                  {errors.employmentStatus.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffGroup">Staff Group *</Label>
              <Select
                onValueChange={(value) => setValue("staffGroup", value as any)}
                defaultValue="STAFF"
              >
                <SelectTrigger id="staffGroup">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATTORNEY">Attorney</SelectItem>
                  <SelectItem value="LAW_CLERK">Law Clerk</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="FIRM_MANAGER">Firm Manager</SelectItem>
                </SelectContent>
              </Select>
              {errors.staffGroup && (
                <p className="text-sm text-destructive">
                  {errors.staffGroup.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportingToId">Reports To (Staff ID)</Label>
              <Input
                id="reportingToId"
                {...register("reportingToId")}
                placeholder="Enter staff ID"
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="applicationAdmin"
                onCheckedChange={(checked) =>
                  setValue("applicationAdmin", checked as boolean)
                }
              />
              <Label htmlFor="applicationAdmin" className="cursor-pointer">
                Application Admin
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Compensation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="defaultCaseRate">Default Case Rate ($) *</Label>
              <Input
                id="defaultCaseRate"
                type="number"
                step="0.01"
                {...register("defaultCaseRate")}
              />
              {errors.defaultCaseRate && (
                <p className="text-sm text-destructive">
                  {errors.defaultCaseRate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payType">Pay Type *</Label>
              <Select
                onValueChange={(value) => setValue("payType", value as any)}
                defaultValue="HOURLY"
              >
                <SelectTrigger id="payType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SALARY">Salary</SelectItem>
                  <SelectItem value="HOURLY">Hourly</SelectItem>
                </SelectContent>
              </Select>
              {errors.payType && (
                <p className="text-sm text-destructive">
                  {errors.payType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payRate">Pay Rate ($) *</Label>
              <Input
                id="payRate"
                type="number"
                step="0.01"
                {...register("payRate")}
              />
              {errors.payRate && (
                <p className="text-sm text-destructive">
                  {errors.payRate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileageReimbursement">
                Mileage Reimbursement ($/mile) *
              </Label>
              <Input
                id="mileageReimbursement"
                type="number"
                step="0.01"
                {...register("mileageReimbursement")}
              />
              {errors.mileageReimbursement && (
                <p className="text-sm text-destructive">
                  {errors.mileageReimbursement.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableOvertime"
                onCheckedChange={(checked) =>
                  setValue("enableOvertime", checked as boolean)
                }
              />
              <Label
                htmlFor="enableOvertime"
                className="cursor-pointer font-semibold"
              >
                Enable Overtime
              </Label>
            </div>

            {enableOvertime && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="overtimeRate">
                    Overtime Rate (multiplier) *
                  </Label>
                  <Input
                    id="overtimeRate"
                    type="number"
                    step="0.01"
                    {...register("overtimeRate")}
                  />
                  {errors.overtimeRate && (
                    <p className="text-sm text-destructive">
                      {errors.overtimeRate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weeklyBaseHours">Weekly Base Hours *</Label>
                  <Input
                    id="weeklyBaseHours"
                    type="number"
                    step="0.5"
                    {...register("weeklyBaseHours")}
                  />
                  {errors.weeklyBaseHours && (
                    <p className="text-sm text-destructive">
                      {errors.weeklyBaseHours.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableAutoBreakDeduction"
                onCheckedChange={(checked) =>
                  setValue("enableAutoBreakDeduction", checked as boolean)
                }
              />
              <Label
                htmlFor="enableAutoBreakDeduction"
                className="cursor-pointer font-semibold"
              >
                Enable Auto Break Deduction
              </Label>
            </div>

            {enableAutoBreakDeduction && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="breaktimeBaseHours">
                    Break Time Base Hours *
                  </Label>
                  <Input
                    id="breaktimeBaseHours"
                    type="number"
                    step="0.25"
                    {...register("breaktimeBaseHours")}
                  />
                  {errors.breaktimeBaseHours && (
                    <p className="text-sm text-destructive">
                      {errors.breaktimeBaseHours.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breaktimeRate">Break Time Rate ($) *</Label>
                  <Input
                    id="breaktimeRate"
                    type="number"
                    step="0.01"
                    {...register("breaktimeRate")}
                  />
                  {errors.breaktimeRate && (
                    <p className="text-sm text-destructive">
                      {errors.breaktimeRate.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enablePerformanceIncentives"
                onCheckedChange={(checked) =>
                  setValue("enablePerformanceIncentives", checked as boolean)
                }
              />
              <Label
                htmlFor="enablePerformanceIncentives"
                className="cursor-pointer font-semibold"
              >
                Enable Performance Incentives
              </Label>
            </div>

            {enablePerformanceIncentives && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="intakeStaffIncentive">
                    Intake Staff Incentive ($) *
                  </Label>
                  <Input
                    id="intakeStaffIncentive"
                    type="number"
                    step="0.01"
                    {...register("intakeStaffIncentive")}
                  />
                  {errors.intakeStaffIncentive && (
                    <p className="text-sm text-destructive">
                      {errors.intakeStaffIncentive.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intakeOverrideIncentive">
                    Intake Override Incentive ($) *
                  </Label>
                  <Input
                    id="intakeOverrideIncentive"
                    type="number"
                    step="0.01"
                    {...register("intakeOverrideIncentive")}
                  />
                  {errors.intakeOverrideIncentive && (
                    <p className="text-sm text-destructive">
                      {errors.intakeOverrideIncentive.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managerOverrideIncentive">
                    Manager Override Incentive ($) *
                  </Label>
                  <Input
                    id="managerOverrideIncentive"
                    type="number"
                    step="0.01"
                    {...register("managerOverrideIncentive")}
                  />
                  {errors.managerOverrideIncentive && (
                    <p className="text-sm text-destructive">
                      {errors.managerOverrideIncentive.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralIncentive">
                    Referral Incentive ($) *
                  </Label>
                  <Input
                    id="referralIncentive"
                    type="number"
                    step="0.01"
                    {...register("referralIncentive")}
                  />
                  {errors.referralIncentive && (
                    <p className="text-sm text-destructive">
                      {errors.referralIncentive.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Banking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input id="bankName" {...register("bankName")} />
              {errors.bankName && (
                <p className="text-sm text-destructive">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankRoutingNumber">Routing Number *</Label>
              <Input
                id="bankRoutingNumber"
                {...register("bankRoutingNumber")}
              />
              {errors.bankRoutingNumber && (
                <p className="text-sm text-destructive">
                  {errors.bankRoutingNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bankAccountNumber">Account Number *</Label>
              <Input
                id="bankAccountNumber"
                type="password"
                {...register("bankAccountNumber")}
              />
              {errors.bankAccountNumber && (
                <p className="text-sm text-destructive">
                  {errors.bankAccountNumber.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" size="lg">
          Save Staff Member
        </Button>
      </div>
    </form>
  );
}
