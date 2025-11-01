// lib/utils/zod.ts
import { z } from "zod";

export function getFieldErrors<T>(
  error: z.ZodFormattedError<T>
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(error)) {
    if (key !== "_errors" && typeof value === "object" && value !== null) {
      const messages = (value as any)._errors;
      if (Array.isArray(messages) && messages.length > 0) {
        fieldErrors[key] = messages;
      }
    }
  }

  return fieldErrors;
}
