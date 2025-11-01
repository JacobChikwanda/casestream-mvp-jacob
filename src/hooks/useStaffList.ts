"use client";

import { staffSelect } from "@/lib/db/selects/staffSelect";
import { Prisma, Staff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
export type StaffListItem = Prisma.StaffGetPayload<{
  select: typeof staffSelect;
}>;

export function useStaffList() {
  const {
    data: staff = [],
    isPending,
    error,
  } = useQuery<StaffListItem[]>({
    queryKey: ["staff"],
    queryFn: async () => {
      const response = await fetch("/api/staff");

      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }

      return response.json();
    },
  });

  return {
    staff,
    loading: isPending,
    error: error
      ? error instanceof Error
        ? error.message
        : "An error occurred"
      : null,
  };
}
