// src/lib/db/selects/staffSelect.ts

export const staffSelect = {
  id: true,
  name: true,
  email: true,
  workEmail: true,
  staffGroup: true,
  applicationAdmin: true,
  accountId: true,
} as const;
