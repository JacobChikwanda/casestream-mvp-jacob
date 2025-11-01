import React, { JSX } from "react";
import { Prisma } from "@prisma/client";
import type { Staff } from "@prisma/client";
import { StaffForm } from "./forms";

/**
 * Supported modes for all forms
 */
export type FormMode = "create" | "read" | "edit";

/**
 * Base form props each form must extend.
 */
export interface BaseFormProps<TData> {
  mode: FormMode;
  data?: TData;
}

/**
 * Define the shape of data expected by each form.
 */
export interface FormDataMap {
  staff: Staff;
}

/**
 * The actual React components for each form.
 */
const formRegistry = {
  // loan: LoanForm,
  // user: UserForm,
  staff: StaffForm,
};

/**
 * Main helper function to get a form dynamically.
 */
export function getForm<TName extends keyof FormDataMap>(
  name: TName,
  mode: FormMode,
  data?: FormDataMap[TName]
): JSX.Element {
  const FormComponent = formRegistry[name] as React.FC<
    BaseFormProps<FormDataMap[TName]>
  >;

  if (!FormComponent) {
    throw new Error(`Form "${name}" not found in formRegistry`);
  }

  if (mode === "read" && !data) {
    throw new Error(`"read" mode requires data for the "${name}" form`);
  }

  return React.createElement(FormComponent, { mode, data });
}
