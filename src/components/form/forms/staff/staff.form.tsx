"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PersonalInfoSection } from "./personal.info.section";
import { EmploymentInfoSection } from "./employment.info.section";
import { CompensationSection } from "./compensation.section";
import { BankingInfoSection } from "./banking.info.section";
import { StaffFormData, staffSchema } from "@/lib/validations/staff";

export function StaffForm() {
  const form = useForm<StaffFormData>({
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
    alert(JSON.stringify(data));
    // API call here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoSection />
        <EmploymentInfoSection />
        <CompensationSection />
        <BankingInfoSection />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" size="lg">
            Save Staff Member
          </Button>
        </div>
      </form>
    </Form>
  );
}
