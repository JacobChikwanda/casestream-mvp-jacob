// src/components/staff/sections/useStaffForm.ts
import { useFormContext } from "react-hook-form";
import type { StaffFormData } from "@/lib/validations/staff";

export const useStaffForm = () => {
  const context = useFormContext<StaffFormData>();

  if (!context) {
    throw new Error(
      "useStaffForm must be used within a StaffForm that is wrapped in <Form>"
    );
  }

  return context;
};
