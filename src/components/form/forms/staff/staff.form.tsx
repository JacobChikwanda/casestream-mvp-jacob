"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm, type Resolver } from "react-hook-form";

import { type StaffFormData, staffSchema } from "@/lib/validations/staff";
import { createStaffAction } from "@/actions/staff/createStaff";
import { useActionState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { PersonalInfoSection } from "./personal.info.section";
import { EmploymentInfoSection } from "./employment.info.section";
import { CompensationSection } from "./compensation.section";
import { BankingInfoSection } from "./banking.info.section";

// Define the shape of your default values based on the schema
// This helps ensure type alignment
const defaultStaffValues: StaffFormData = {
  // Personal Info
  name: "",
  email: "",
  phone: "",
  workEmail: "",
  workPhone: "",
  extension: "",
  dob: "",
  gender: null,
  race: null,

  // Address
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "USA",

  // Emergency Contact
  emergencyContact: "",
  emergencyContactPhone: "",
  emergencyContactEmail: "",
  resume: "",

  // Employment
  hireDate: "",
  leaveDate: "",
  employmentStatus: "ACTIVE",
  staffGroup: "STAFF",
  applicationAdmin: false,
  reportingToId: "",

  // Compensation
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

  // Banking
  bankName: "",
  bankRoutingNumber: "",
  bankAccountNumber: "",
};

export function StaffForm() {
  const accountId = useAuthStore((state) => state.user?.accountId);

  const createStaffActionWithAccount = createStaffAction.bind(
    null,
    accountId || ""
  );

  const [state, formAction, isPending] = useActionState(
    createStaffActionWithAccount,
    {
      success: false,
      message: "",
    }
  );

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema) as unknown as Resolver<StaffFormData>,
    defaultValues: defaultStaffValues,
  });

  // ... (rest of the component is unchanged)

  useEffect(() => {
    if (state.success) {
      form.reset();
    }
  }, [state.success, form]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // IMPORTANT: The original logic below converts boolean `false` to "false" string,
        // which might be necessary for your server action using FormData.
        const stringValue =
          typeof value === "boolean"
            ? value
              ? "true"
              : "false"
            : String(value);
        formData.append(key, stringValue);
      }
    });

    formAction(formData);
  };

  return (
    <div className="space-y-6">
      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          {state.success ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.errors && Object.keys(state.errors).length > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Server Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(state.errors).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong> {messages.join(", ")}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PersonalInfoSection />
          <EmploymentInfoSection />
          <CompensationSection />
          <BankingInfoSection />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Saving..." : "Save Staff Member"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
