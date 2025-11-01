import type { z } from "zod";

export type ActionState<T = unknown> = {
  success?: boolean;
  message: string;
  errors?: z.ZodFormattedError<T>;
  data?: T;
};

export type ServerActionResult<T = unknown> = Promise<ActionState<T>>;
