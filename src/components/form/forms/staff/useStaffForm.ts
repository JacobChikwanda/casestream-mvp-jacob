"use client";

import { useFormContext } from "react-hook-form";
import type { StaffFormData } from "@/lib/validations/staff";

export function useStaffForm() {
  return useFormContext<StaffFormData>();
}
