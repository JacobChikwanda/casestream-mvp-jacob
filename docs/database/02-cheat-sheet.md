# 🎯 Prisma Cheat Sheet - Keep This Handy!

> Print this out or bookmark it. You'll use this constantly.

---

## The 5 Main Queries

```javascript
// 1️⃣ GET ALL (findMany)
const all = await prisma.case.findMany();
const filtered = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }
});

// 2️⃣ GET ONE (findUnique)
const one = await prisma.case.findUnique({
  where: { id: "case-123" }
});

// 3️⃣ CREATE (create)
const created = await prisma.case.create({
  data: {
    caseName: "Smith v. Jones",
    caseStatus: "OPEN",
    // ... required fields
  }
});

// 4️⃣ UPDATE (update)
const updated = await prisma.case.update({
  where: { id: "case-123" },
  data: { caseStatus: "CLOSED" }
});

// 5️⃣ DELETE (delete)
await prisma.case.delete({
  where: { id: "case-123" }
});
```

---

## Include Related Data

```javascript
// Get a case with its client
const caseData = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true  // Get the client
  }
});

// Access the related data
console.log(caseData.primaryContact.name);

// Get a case with MULTIPLE related items
const complete = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true,        // Client
    caseStaff: {
      include: { staff: true }   // Attorneys
    },
    timeEntries: true,           // Hours logged
    expenses: true,              // Costs
    documents: true,             // Files
    events: true                 // Meetings
  }
});
```

---

## Filter Data (Where Clause)

```javascript
// Single filter
where: { caseStatus: "OPEN" }

// Multiple filters (ALL must match)
where: {
  accountId: "firm-123",
  caseStatus: "OPEN"
}

// Comparison operators
where: {
  durationHours: { gt: 5 }         // Greater than
  durationHours: { gte: 5 }        // Greater than or equal
  durationHours: { lt: 10 }        // Less than
  durationHours: { lte: 10 }       // Less than or equal
  durationHours: { not: 0 }        // Not equal
}

// Date range
where: {
  createdAt: {
    gte: new Date("2025-01-01"),
    lt: new Date("2025-02-01")
  }
}

// Check if item is in array
where: {
  assignedStaffIds: {
    has: "staff-123"  // Is staff-123 assigned?
  }
}

// Text search
where: {
  caseName: { contains: "Smith" }  // Case name contains "Smith"
}
```

---

## Common Patterns

### Get All Cases for Your Firm

```javascript
const cases = await prisma.case.findMany({
  where: { accountId: "your-firm-id" }
});
```

**Important:** ALWAYS filter by accountId!

### Get Open Cases

```javascript
const openCases = await prisma.case.findMany({
  where: {
    accountId: "your-firm-id",
    caseStatus: "OPEN"
  }
});
```

### Count Records

```javascript
const count = await prisma.case.count({
  where: { caseStatus: "OPEN" }
});
// Returns: 5
```

### Sum Numbers

```javascript
const stats = await prisma.timeEntry.aggregate({
  where: { caseId: "case-123" },
  _sum: {
    durationHours: true,
    total: true
  }
});

console.log(stats._sum.durationHours);  // Total hours
console.log(stats._sum.total);           // Total money
```

### Get Records Assigned to Someone

```javascript
const tasks = await prisma.task.findMany({
  where: {
    assignedStaffIds: { has: "staff-123" },
    status: "OPEN"
  }
});
```

### Sort Results

```javascript
// Sort newest first
where: { ... },
orderBy: { createdAt: "desc" }

// Sort oldest first
where: { ... },
orderBy: { createdAt: "asc" }

// Sort by multiple fields
where: { ... },
orderBy: [
  { status: "asc" },
  { createdAt: "desc" }
]
```

### Limit Results

```javascript
where: { ... },
take: 10  // Get only first 10
```

### Skip Results (Pagination)

```javascript
where: { ... },
skip: 20,  // Skip first 20
take: 10   // Get next 10
```

---

## Creating Records

### Create a Case

```javascript
const newCase = await prisma.case.create({
  data: {
    // REQUIRED fields
    accountId: "firm-123",
    caseName: "Smith v. Jones",
    caseStatus: "OPEN",
    primaryContactId: "contact-123",
    createdById: "staff-123",
    updatedById: "staff-123",
    
    // OPTIONAL fields
    caseNumber: "2025-001",
    practiceArea: "PERSONAL_INJURY",
    caseStage: "PRE_CHARGE"
  }
});
```

### Create a Time Entry

```javascript
import { Decimal } from "@prisma/client/runtime/library";

const timeEntry = await prisma.timeEntry.create({
  data: {
    accountId: "firm-123",
    caseId: "case-123",
    staffId: "staff-123",
    activityId: "activity-123",
    entryDate: new Date("2025-01-15"),
    durationHours: new Decimal("2.5"),  // Use Decimal for money
    billable: true,
    rate: new Decimal("350"),
    total: new Decimal("875"),  // 2.5 * 350
    status: "OPEN",
    createdById: "staff-123",
    updatedById: "staff-123"
  }
});
```

### Create a Task

```javascript
const task = await prisma.task.create({
  data: {
    accountId: "firm-123",
    taskName: "Research statutes",
    priority: "HIGH",
    status: "OPEN",
    dueDate: new Date("2025-02-01"),
    assignedStaffIds: ["staff-1", "staff-2"],  // Multiple assignments
    createdById: "staff-123",
    updatedById: "staff-123"
  }
});
```

---

## Updating Records

### Simple Update

```javascript
await prisma.case.update({
  where: { id: "case-123" },
  data: { 
    caseStatus: "CLOSED",
    updatedById: "staff-456"  // Don't forget to track who updated it!
  }
});
```

### Update with Include

```javascript
const updated = await prisma.case.update({
  where: { id: "case-123" },
  data: { caseStatus: "CLOSED" },
  include: { primaryContact: true }  // Get updated record with relations
});

console.log(updated.primaryContact.name);
```

---

## Deleting Records

```javascript
// Delete one record
await prisma.case.delete({
  where: { id: "case-123" }
});

// Delete many records
await prisma.case.deleteMany({
  where: { caseStatus: "CLOSED" }
});
```

---

## Error Handling

```javascript
try {
  const result = await prisma.case.findUnique({
    where: { id: "case-123" }
  });
  
  if (!result) {
    console.log("Case not found");
  } else {
    console.log("Found:", result);
  }
} catch (error) {
  console.error("Error:", error.message);
}
```

---

## Field Name Reference

| What You Want | Field Name |
|---------------|-----------|
| Case ID | `id` |
| Which firm | `accountId` |
| Case name | `caseName` |
| Case number | `caseNumber` |
| Status | `caseStatus` (values: OPEN, GET_REVIEW, CLOSED) |
| Client | `primaryContactId` |
| Created by | `createdById` |
| Created on | `createdAt` |
| Updated by | `updatedById` |
| Updated on | `updatedAt` |

---

## Enum Values (Valid Options)

### CaseStatus
```
"OPEN"
"GET_REVIEW"
"CLOSED"
```

### CaseStage
```
"PRE_CHARGE"
"LOWER_COURT"
"UPPER_COURT"
"APPEALS_COURT"
```

### PracticeArea
```
"PERSONAL_INJURY"
"FAMILY"
"CRIMINAL"
"CORPORATE"
"etc..."
```

### TaskStatus
```
"OPEN"
"CLOSED"
```

### BillableStatus
```
"OPEN"
"INVOICED"
```

---

## Important Patterns

### ✅ CORRECT: Always filter by accountId
```javascript
const cases = await prisma.case.findMany({
  where: { accountId: "my-firm-id" }
});
```

### ❌ WRONG: Forgetting accountId
```javascript
const cases = await prisma.case.findMany();
// Gets cases from ALL firms!
```

### ✅ CORRECT: Use include to get related data
```javascript
const caseData = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: { primaryContact: true }
});
console.log(caseData.primaryContact.name);
```

### ❌ WRONG: Assuming related data exists
```javascript
const caseData = await prisma.case.findUnique({
  where: { id: "case-123" }
});
console.log(caseData.primaryContact.name);  // ERROR!
```

### ✅ CORRECT: Check if record exists
```javascript
const result = await prisma.case.findUnique({
  where: { id: "case-123" }
});
if (!result) {
  console.log("Not found");
} else {
  console.log("Found");
}
```

### ❌ WRONG: Assuming it exists
```javascript
const result = await prisma.case.findUnique({
  where: { id: "case-123" }
});
console.log(result.caseName);  // Crash if not found!
```

### ✅ CORRECT: Set createdById and updatedById
```javascript
const newCase = await prisma.case.create({
  data: {
    caseName: "Smith v. Jones",
    createdById: "staff-123",    // ← Who created it
    updatedById: "staff-123",    // ← Who last updated it
    // ... other fields
  }
});
```

### ✅ CORRECT: Use Decimal for money
```javascript
import { Decimal } from "@prisma/client/runtime/library";

rate: new Decimal("350.50")
```

### ❌ WRONG: Regular numbers for money
```javascript
rate: 350.50  // Can lose precision
```

---

## Setup Checklist

- [ ] Install Prisma: `npm install @prisma/client`
- [ ] Create `.env` file with `DATABASE_URL`
- [ ] Import PrismaClient: `import { PrismaClient } from "@prisma/client"`
- [ ] Create prisma instance: `const prisma = new PrismaClient()`
- [ ] Copy schema to `prisma/schema.prisma`
- [ ] Run migrations: `npx prisma migrate dev --name init`

---

## Debugging Tips

**Problem: Can't find a case**
```javascript
// Check:
const result = await prisma.case.findUnique({
  where: { id: "case-123" }
});
console.log(result);  // Is it null?
```

**Problem: Data not updating**
```javascript
// Check:
const result = await prisma.case.update({
  where: { id: "case-123" },
  data: { caseStatus: "CLOSED" }
});
console.log(result);  // Was it updated?
```

**Problem: Related data missing**
```javascript
// Check:
const caseData = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: { primaryContact: true }  // ← Add this
});
```

**Problem: Wrong field name**
```javascript
// Check schema for correct name:
// "caseName" not "case_name"
// "primaryContactId" not "client_id"
```

---

## Helpful Queries to Copy

### Dashboard: Get firm summary
```javascript
const summary = {
  openCases: await prisma.case.count({
    where: { accountId: "firm-id", caseStatus: "OPEN" }
  }),
  staff: await prisma.staff.count({
    where: { accountId: "firm-id", employmentStatus: "ACTIVE" }
  }),
  thisMonthBilled: (await prisma.timeEntry.aggregate({
    where: {
      accountId: "firm-id",
      entryDate: { gte: new Date("2025-01-01") }
    },
    _sum: { total: true }
  }))._sum.total
};
```

### My Tasks
```javascript
const myTasks = await prisma.task.findMany({
  where: {
    accountId: "firm-id",
    assignedStaffIds: { has: "my-staff-id" },
    status: "OPEN"
  },
  orderBy: { dueDate: "asc" }
});
```

### Case Details
```javascript
const caseDetails = await prisma.case.findUnique({
  where: { id: "case-id" },
  include: {
    primaryContact: true,
    caseStaff: { include: { staff: true } },
    timeEntries: true,
    expenses: true,
    documents: true
  }
});
```

### Billing Report
```javascript
const billing = await prisma.timeEntry.findMany({
  where: {
    caseId: "case-id",
    status: "OPEN",  // Not yet invoiced
    billable: true
  },
  include: { activity: true }
});

const total = await prisma.timeEntry.aggregate({
  where: { caseId: "case-id", status: "OPEN" },
  _sum: { total: true }
});
```

---

## Common Mistakes (Don't Do These!)

❌ Forgetting accountId - Gets all firms' data
❌ Not including related data - Can't access client name
❌ Using wrong field names - Case name or caseName?
❌ Not checking if record exists - Crashes if null
❌ Using numbers for money - Precision issues
❌ Forgetting createdById/updatedById - Can't audit
❌ Using findMany with unique field - Use findUnique
❌ Using findUnique with non-unique field - Won't work
❌ Not handling errors - Crashes on network issues

---

## When You're Stuck

1. **Check the error message** - It usually tells you what's wrong
2. **Look at the schema** - See what fields exist and which are required
3. **Print the result** - `console.log(result)` to see what you got
4. **Try a simpler query** - Start with `findMany()` without filters
5. **Read the Onboarding Guide** - Check the troubleshooting section
6. **Ask for help** - No such thing as a dumb question!

---

## References

- **Main Guide**: `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md`
- **Schema**: `prisma-schema-FINAL-FIXED.prisma`
- **Visual Guide**: `VISUAL-QUICK-REFERENCE.txt`
- **Prisma Docs**: https://www.prisma.io/docs/

---

**Save this file. You'll use it every day!** 📌