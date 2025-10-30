-- CreateEnum
CREATE TYPE "PayType" AS ENUM ('SALARY', 'HOURLY');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StaffGroup" AS ENUM ('ATTORNEY', 'LAW_CLERK', 'STAFF', 'FIRM_MANAGER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('AMERICAN_INDIAN_ALASKA_NATIVE', 'ASIAN', 'BLACK_AFRICAN_AMERICAN', 'NATIVE_HAWAIIAN_PACIFIC_ISLANDER', 'CAUCASIAN', 'HISPANIC_LATINO');

-- CreateEnum
CREATE TYPE "PracticeArea" AS ENUM ('PERSONAL_INJURY', 'FAMILY', 'ESTATE_PLANNING', 'PROBATE', 'CORPORATE', 'CIVIL_LITIGATION', 'IMMIGRATION', 'BANKRUPTCY', 'CRIMINAL_DEFENSE', 'TAX', 'MEDICAL_MALPRACTICE', 'WORKERS_COMPENSATION');

-- CreateEnum
CREATE TYPE "CaseStage" AS ENUM ('PRE_CHARGE', 'LOWER_COURT', 'UPPER_COURT', 'APPEALS_COURT');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('FLAT_FEE', 'HOURLY', 'CONTINGENCY', 'PRO_BONO', 'HYBRID_FLAT_HOURLY', 'HYBRID_FLAT_CONTINGENCY', 'HYBRID_HOURLY_CONTINGENCY');

-- CreateEnum
CREATE TYPE "TrialType" AS ENUM ('BENCH_TRIAL', 'JURY_TRIAL');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('OPEN', 'GET_REVIEW', 'CLOSED');

-- CreateEnum
CREATE TYPE "ContactGroup" AS ENUM ('ADVERSE_PARTY', 'ATTORNEY', 'CLIENT', 'CLIENT_ASSISTANT', 'CLIENT_FAMILY', 'CLIENT_FRIEND', 'CO_COUNSEL', 'COURT_STAFF', 'EXPERT', 'INSURANCE_ADJUSTER', 'INVESTIGATOR', 'JUDGE', 'LAW_FIRM', 'LAW_ENFORCEMENT', 'OTHER_LEGAL');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('PERSONAL_CHECKING', 'PERSONAL_SAVINGS', 'BUSINESS_CHECKING', 'BUSINESS_SAVINGS', 'TRUST', 'OPERATING', 'IOLTA');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('ADDED', 'EDITED', 'DELETED');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('OPEN', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "LeadStage" AS ENUM ('PROSPECT', 'FOLLOW_UP', 'CONSULT');

-- CreateEnum
CREATE TYPE "LeadLostReason" AS ENUM ('NO_MONEY', 'NO_CASE', 'CALLING_FOR_INFORMATION', 'MARKETING', 'WRONG_NUMBER', 'OUT_OF_STATE', 'OUTSIDE_PRACTICE_AREA', 'HIRED_SOMEONE_ELSE');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('HARDCOPY', 'DIGITAL', 'DISC', 'USB', 'HARD_DRIVE');

-- CreateEnum
CREATE TYPE "ReminderDuration" AS ENUM ('MINUTES', 'HOURS', 'DAYS', 'WEEKS');

-- CreateEnum
CREATE TYPE "BillableStatus" AS ENUM ('OPEN', 'INVOICED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('NORMAL', 'HIGH');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "firmName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "logo" TEXT,
    "accountSlug" TEXT NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "name" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "workEmail" VARCHAR(255) NOT NULL,
    "workPhone" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "gender" "Gender",
    "race" "Race",
    "address" JSONB NOT NULL,
    "hireDate" DATE NOT NULL,
    "leaveDate" DATE,
    "employmentStatus" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "staffGroup" "StaffGroup" NOT NULL,
    "applicationAdmin" BOOLEAN NOT NULL DEFAULT false,
    "reportingToId" UUID,
    "defaultCaseRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "payType" "PayType" NOT NULL DEFAULT 'SALARY',
    "payRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "mileageReimbursement" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "enableOvertime" BOOLEAN NOT NULL DEFAULT false,
    "overtimeRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "weeklyBaseHours" DECIMAL(5,2) NOT NULL DEFAULT 40,
    "enableAutoBreakDeduction" BOOLEAN NOT NULL DEFAULT false,
    "breaktimeBaseHours" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "breaktimeRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "enablePerformanceIncentives" BOOLEAN NOT NULL DEFAULT false,
    "intakeStaffIncentive" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "intakeOverrideIncentive" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "managerOverrideIncentive" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "referralIncentive" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bankName" TEXT NOT NULL,
    "bankRoutingNumber" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactEmail" TEXT NOT NULL,
    "resume" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "caseName" TEXT NOT NULL,
    "autoGenerateCaseName" BOOLEAN NOT NULL DEFAULT true,
    "practiceArea" "PracticeArea" NOT NULL,
    "caseStage" "CaseStage" NOT NULL DEFAULT 'PRE_CHARGE',
    "caseStatus" "CaseStatus" NOT NULL DEFAULT 'OPEN',
    "causeOfActionId" UUID NOT NULL,
    "caseDescription" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "incidentLocation" TEXT NOT NULL,
    "addStatuteOfLimitations" BOOLEAN NOT NULL DEFAULT false,
    "statuteOfLimitationsDate" TIMESTAMP(3),
    "feeType" "FeeType" NOT NULL,
    "flatFeeRetainer" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "hourlyRetainer" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "preLitigationRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "litigationRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "litigationTrialRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "trialIncluded" BOOLEAN NOT NULL DEFAULT false,
    "trialType" "TrialType",
    "hoursLimited" BOOLEAN NOT NULL DEFAULT false,
    "hourLimit" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "expertIncluded" BOOLEAN NOT NULL DEFAULT false,
    "expertBudget" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "investigatorIncluded" BOOLEAN NOT NULL DEFAULT false,
    "investigatorBudget" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "recordSealIncluded" BOOLEAN NOT NULL DEFAULT false,
    "intakeDate" TIMESTAMP(3) NOT NULL,
    "closeDate" TIMESTAMP(3),
    "nextCaseSearch" TIMESTAMP(3) NOT NULL,
    "primaryContactId" UUID NOT NULL,
    "referredById" UUID,
    "courtId" UUID,
    "departmentId" UUID,
    "shareInfoWithId" UUID,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStaff" (
    "id" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "staffId" UUID NOT NULL,
    "caseRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "group" "ContactGroup" NOT NULL,
    "titlePosition" TEXT NOT NULL,
    "email" VARCHAR(255),
    "mobilePhone" TEXT,
    "alternatePhone" TEXT,
    "workPhone" TEXT,
    "fax" TEXT,
    "website" TEXT,
    "address" JSONB NOT NULL,
    "dob" DATE,
    "gender" "Gender",
    "countryOfCitizenship" TEXT NOT NULL DEFAULT 'United States',
    "nativeLanguage" TEXT NOT NULL DEFAULT 'English',
    "courtDetails" BOOLEAN NOT NULL DEFAULT false,
    "department" TEXT,
    "courtroom" TEXT,
    "biographicalDetails" BOOLEAN NOT NULL DEFAULT false,
    "education" TEXT,
    "employment" TEXT,
    "currentEmployer" TEXT,
    "timeWithCurrentEmployer" TEXT,
    "communityService" BOOLEAN NOT NULL DEFAULT false,
    "familySupport" BOOLEAN NOT NULL DEFAULT false,
    "criminalHistory" BOOLEAN NOT NULL DEFAULT false,
    "criminalHistoryDescription" TEXT,
    "sourceOfFunds" TEXT,
    "custodyDetails" BOOLEAN NOT NULL DEFAULT false,
    "jailPrisonId" UUID,
    "inmateId" TEXT,
    "bailStatus" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "leadStatus" "LeadStatus" NOT NULL DEFAULT 'OPEN',
    "leadStage" "LeadStage" NOT NULL DEFAULT 'PROSPECT',
    "nextCourtDate" TIMESTAMP(3),
    "caseId" UUID,
    "lostReason" "LeadLostReason",

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "folderId" UUID NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "fileLink" TEXT NOT NULL,
    "discovery" BOOLEAN NOT NULL DEFAULT false,
    "reviewedByStaffIds" TEXT[],

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID,
    "notLinkedToCase" BOOLEAN NOT NULL DEFAULT false,
    "activityId" UUID NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "clientAttendanceRequired" BOOLEAN NOT NULL DEFAULT false,
    "clientUpdated" BOOLEAN NOT NULL DEFAULT false,
    "locationId" UUID,
    "departmentId" UUID,
    "staffIds" TEXT[],
    "documentIds" TEXT[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventContact" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "contactId" UUID NOT NULL,

    CONSTRAINT "EventContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeEntry" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "staffId" UUID NOT NULL,
    "activityId" UUID NOT NULL,
    "billable" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "rate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "durationHours" DECIMAL(5,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "invoiceId" UUID,
    "status" "BillableStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "TimeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "staffId" UUID NOT NULL,
    "activityId" UUID NOT NULL,
    "billable" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "reductions" DECIMAL(10,2) DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "receiptLink" TEXT,
    "invoiceId" UUID,
    "status" "BillableStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "staffId" UUID NOT NULL,
    "timesheetDate" DATE NOT NULL,
    "clockInTime" TIMESTAMP(3) NOT NULL,
    "clockOutTime" TIMESTAMP(3) NOT NULL,
    "durationHours" DECIMAL(5,2) NOT NULL,
    "timesheetReportId" UUID,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "recordId" UUID NOT NULL,
    "recordType" TEXT NOT NULL,
    "howManyBeforeEvent" INTEGER NOT NULL,
    "duration" "ReminderDuration" NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "url" TEXT,
    "dueDate" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID,
    "notLinkedToCase" BOOLEAN NOT NULL DEFAULT false,
    "taskName" TEXT NOT NULL,
    "priority" "TaskPriority" NOT NULL DEFAULT 'NORMAL',
    "notes" TEXT,
    "dueDate" TIMESTAMP(3),
    "noDueDate" BOOLEAN NOT NULL DEFAULT false,
    "assignedStaffIds" TEXT[],
    "documentIds" TEXT[],
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Update" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "caseId" UUID NOT NULL,
    "nextActivityId" UUID NOT NULL,
    "todaysUpdate" TEXT NOT NULL,
    "clientAttendanceRequired" BOOLEAN NOT NULL DEFAULT false,
    "clientUpdated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "staffId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caseId" UUID,
    "action" "ActivityAction" NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "bankName" TEXT NOT NULL,
    "routingNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "fractionalRoutingNumber" TEXT,
    "checkStartNumber" INTEGER NOT NULL,
    "startingBalance" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfAction" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeOfAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauseOfAction" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,
    "typeOfActionId" UUID NOT NULL,
    "causeOfActionName" TEXT NOT NULL,
    "penalty" TEXT,
    "fine" TEXT,

    CONSTRAINT "CauseOfAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LeadToReminder" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_LeadToReminder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventToReminder" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_EventToReminder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountSlug_key" ON "Account"("accountSlug");

-- CreateIndex
CREATE INDEX "Account_accountSlug_idx" ON "Account"("accountSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_workEmail_key" ON "Staff"("workEmail");

-- CreateIndex
CREATE INDEX "Staff_accountId_idx" ON "Staff"("accountId");

-- CreateIndex
CREATE INDEX "Staff_reportingToId_idx" ON "Staff"("reportingToId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_accountId_workEmail_key" ON "Staff"("accountId", "workEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Case_caseNumber_key" ON "Case"("caseNumber");

-- CreateIndex
CREATE INDEX "Case_accountId_idx" ON "Case"("accountId");

-- CreateIndex
CREATE INDEX "Case_causeOfActionId_idx" ON "Case"("causeOfActionId");

-- CreateIndex
CREATE INDEX "Case_primaryContactId_idx" ON "Case"("primaryContactId");

-- CreateIndex
CREATE INDEX "Case_practiceArea_idx" ON "Case"("practiceArea");

-- CreateIndex
CREATE INDEX "Case_caseStatus_idx" ON "Case"("caseStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Case_accountId_caseNumber_key" ON "Case"("accountId", "caseNumber");

-- CreateIndex
CREATE INDEX "CaseStaff_caseId_idx" ON "CaseStaff"("caseId");

-- CreateIndex
CREATE INDEX "CaseStaff_staffId_idx" ON "CaseStaff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStaff_caseId_staffId_key" ON "CaseStaff"("caseId", "staffId");

-- CreateIndex
CREATE INDEX "Contact_accountId_idx" ON "Contact"("accountId");

-- CreateIndex
CREATE INDEX "Contact_group_idx" ON "Contact"("group");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_accountId_email_key" ON "Contact"("accountId", "email");

-- CreateIndex
CREATE INDEX "Lead_accountId_idx" ON "Lead"("accountId");

-- CreateIndex
CREATE INDEX "Lead_leadStatus_idx" ON "Lead"("leadStatus");

-- CreateIndex
CREATE INDEX "Lead_caseId_idx" ON "Lead"("caseId");

-- CreateIndex
CREATE INDEX "Document_accountId_idx" ON "Document"("accountId");

-- CreateIndex
CREATE INDEX "Document_caseId_idx" ON "Document"("caseId");

-- CreateIndex
CREATE INDEX "Document_folderId_idx" ON "Document"("folderId");

-- CreateIndex
CREATE INDEX "Folder_accountId_idx" ON "Folder"("accountId");

-- CreateIndex
CREATE INDEX "Activity_accountId_idx" ON "Activity"("accountId");

-- CreateIndex
CREATE INDEX "Event_accountId_idx" ON "Event"("accountId");

-- CreateIndex
CREATE INDEX "Event_caseId_idx" ON "Event"("caseId");

-- CreateIndex
CREATE INDEX "Event_activityId_idx" ON "Event"("activityId");

-- CreateIndex
CREATE INDEX "EventContact_eventId_idx" ON "EventContact"("eventId");

-- CreateIndex
CREATE INDEX "EventContact_contactId_idx" ON "EventContact"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "EventContact_eventId_contactId_key" ON "EventContact"("eventId", "contactId");

-- CreateIndex
CREATE INDEX "TimeEntry_accountId_idx" ON "TimeEntry"("accountId");

-- CreateIndex
CREATE INDEX "TimeEntry_caseId_idx" ON "TimeEntry"("caseId");

-- CreateIndex
CREATE INDEX "TimeEntry_staffId_idx" ON "TimeEntry"("staffId");

-- CreateIndex
CREATE INDEX "TimeEntry_status_idx" ON "TimeEntry"("status");

-- CreateIndex
CREATE INDEX "Expense_accountId_idx" ON "Expense"("accountId");

-- CreateIndex
CREATE INDEX "Expense_caseId_idx" ON "Expense"("caseId");

-- CreateIndex
CREATE INDEX "Expense_billable_idx" ON "Expense"("billable");

-- CreateIndex
CREATE INDEX "Expense_status_idx" ON "Expense"("status");

-- CreateIndex
CREATE INDEX "Timesheet_accountId_idx" ON "Timesheet"("accountId");

-- CreateIndex
CREATE INDEX "Timesheet_staffId_idx" ON "Timesheet"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Timesheet_staffId_timesheetDate_key" ON "Timesheet"("staffId", "timesheetDate");

-- CreateIndex
CREATE INDEX "Reminder_accountId_idx" ON "Reminder"("accountId");

-- CreateIndex
CREATE INDEX "Reminder_recordId_idx" ON "Reminder"("recordId");

-- CreateIndex
CREATE INDEX "Requirement_accountId_idx" ON "Requirement"("accountId");

-- CreateIndex
CREATE INDEX "Requirement_caseId_idx" ON "Requirement"("caseId");

-- CreateIndex
CREATE INDEX "Task_accountId_idx" ON "Task"("accountId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Update_accountId_idx" ON "Update"("accountId");

-- CreateIndex
CREATE INDEX "Update_caseId_idx" ON "Update"("caseId");

-- CreateIndex
CREATE INDEX "ActivityLog_accountId_idx" ON "ActivityLog"("accountId");

-- CreateIndex
CREATE INDEX "ActivityLog_staffId_idx" ON "ActivityLog"("staffId");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

-- CreateIndex
CREATE INDEX "BankAccount_accountId_idx" ON "BankAccount"("accountId");

-- CreateIndex
CREATE INDEX "TypeOfAction_accountId_idx" ON "TypeOfAction"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeOfAction_accountId_type_key" ON "TypeOfAction"("accountId", "type");

-- CreateIndex
CREATE INDEX "CauseOfAction_accountId_idx" ON "CauseOfAction"("accountId");

-- CreateIndex
CREATE INDEX "CauseOfAction_typeOfActionId_idx" ON "CauseOfAction"("typeOfActionId");

-- CreateIndex
CREATE UNIQUE INDEX "CauseOfAction_accountId_causeOfActionName_key" ON "CauseOfAction"("accountId", "causeOfActionName");

-- CreateIndex
CREATE INDEX "_LeadToReminder_B_index" ON "_LeadToReminder"("B");

-- CreateIndex
CREATE INDEX "_EventToReminder_B_index" ON "_EventToReminder"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_reportingToId_fkey" FOREIGN KEY ("reportingToId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_causeOfActionId_fkey" FOREIGN KEY ("causeOfActionId") REFERENCES "CauseOfAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_primaryContactId_fkey" FOREIGN KEY ("primaryContactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_shareInfoWithId_fkey" FOREIGN KEY ("shareInfoWithId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStaff" ADD CONSTRAINT "CaseStaff_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStaff" ADD CONSTRAINT "CaseStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContact" ADD CONSTRAINT "EventContact_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContact" ADD CONSTRAINT "EventContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfAction" ADD CONSTRAINT "TypeOfAction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfAction" ADD CONSTRAINT "TypeOfAction_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfAction" ADD CONSTRAINT "TypeOfAction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseOfAction" ADD CONSTRAINT "CauseOfAction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseOfAction" ADD CONSTRAINT "CauseOfAction_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseOfAction" ADD CONSTRAINT "CauseOfAction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CauseOfAction" ADD CONSTRAINT "CauseOfAction_typeOfActionId_fkey" FOREIGN KEY ("typeOfActionId") REFERENCES "TypeOfAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadToReminder" ADD CONSTRAINT "_LeadToReminder_A_fkey" FOREIGN KEY ("A") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadToReminder" ADD CONSTRAINT "_LeadToReminder_B_fkey" FOREIGN KEY ("B") REFERENCES "Reminder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToReminder" ADD CONSTRAINT "_EventToReminder_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToReminder" ADD CONSTRAINT "_EventToReminder_B_fkey" FOREIGN KEY ("B") REFERENCES "Reminder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
