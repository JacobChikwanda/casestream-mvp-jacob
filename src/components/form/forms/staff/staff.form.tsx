"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm, type Resolver } from "react-hook-form";
import { useEffect } from "react";

import { type StaffFormData, staffSchema } from "@/lib/validations/staff";
import { createStaffAction } from "@/actions/staff/createStaff";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/lib/store/auth";
import { PersonalInfoSection } from "./personal.info.section";
import { EmploymentInfoSection } from "./employment.info.section";
import { CompensationSection } from "./compensation.section";
import { BankingInfoSection } from "./banking.info.section";
import { type ActionState } from "@/lib/types/server-action";
import { getFieldErrors } from "@/lib/validations/zod";

const defaultStaffValues: StaffFormData = {
  name: "",
  email: "",
  phone: "",
  workEmail: "",
  workPhone: "",
  extension: "",
  dob: "",
  gender: null,
  race: null,
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "USA",
  emergencyContact: "",
  emergencyContactPhone: "",
  emergencyContactEmail: "",
  resume: "",
  hireDate: "",
  leaveDate: "",
  employmentStatus: "ACTIVE",
  staffGroup: "STAFF",
  applicationAdmin: false,
  defaultCaseRate: 0,
  payType: "HOURLY",
  payRate: 0,
  mileageReimbursement: 0,
  enableOvertime: false,
  overtimeRate: 0,
  weeklyBaseHours: 40,
  enableAutoBreakDeduction: false,
  breaktimeBaseHours: 0,
  breaktimeRate: 0,
  enablePerformanceIncentives: false,
  intakeStaffIncentive: 0,
  intakeOverrideIncentive: 0,
  managerOverrideIncentive: 0,
  referralIncentive: 0,
  bankName: "",
  bankRoutingNumber: "",
  bankAccountNumber: "",
};

export function StaffForm() {
  const accountId = useAuthStore((state) => state.user?.accountId || "2");

  // useActionState with correct typing
  const [state, formAction, isPending] = useActionState(createStaffAction, {
    success: undefined,
    message: "",
    errors: undefined,
    data: undefined,
  } satisfies ActionState<StaffFormData>);

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema) as unknown as Resolver<StaffFormData>,
    defaultValues: defaultStaffValues,
    mode: "onTouched",
  });

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      form.reset();
    }
  }, [state.success, form]);

  // Sync server errors to react-hook-form
  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, value]) => {
        if (
          field !== "_errors" &&
          typeof value === "object" &&
          value !== null
        ) {
          const messages = (value as any)._errors;
          if (messages && messages.length > 0) {
            form.setError(field as keyof StaffFormData, {
              type: "server",
              message: messages.join(", "),
            });
          }
        }
      });
    }
  }, [state.errors, form]);

  const fieldErrors = state.errors ? getFieldErrors(state.errors) : {};
  return (
    <div className="space-y-6">
      {/* General Message */}
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

      {/* Server Validation Errors */}
      {Object.keys(fieldErrors).length > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(fieldErrors).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong> {messages.join(", ")}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* Hidden field for accountId */}
          <input type="hidden" name="accountId" value={accountId} />

          <PersonalInfoSection />
          <EmploymentInfoSection />
          <CompensationSection />
          <BankingInfoSection />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Staff Member"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
