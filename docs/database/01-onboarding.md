# 🚀 Welcome to the Team! Your Complete Onboarding Guide

> **This guide is written for EVERYONE** - whether you know Prisma or not, whether you know databases or not. We explain everything from scratch.

---

## Table of Contents

1. [Before You Start](#before-you-start)
2. [What You're Going to Build](#what-youre-going-to-build)
3. [The Basics in Plain English](#the-basics-in-plain-english)
4. [Your Database is Like...](#your-database-is-like)
5. [The 22 Things You Need to Know](#the-22-things-you-need-to-know)
6. [How Prisma Works](#how-prisma-works)
7. [Your First Query (Copy & Paste)](#your-first-query-copy--paste)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)
10. [Frequently Asked Questions](#frequently-asked-questions)

---

## Before You Start

### What You Need to Know

You're joining a project that helps **law firms manage their cases**. Think of it like a digital office for lawyers.

The law firm:
- Has **employees** (attorneys, staff)
- Works on **cases** (legal matters)
- Tracks **time** (how many hours they worked)
- Tracks **expenses** (costs they incurred)
- Manages **documents** (legal files)
- Schedules **events** (meetings, court hearings)

### What You're Going to Use

- **Prisma**: A tool that lets you use a database without writing SQL
- **PostgreSQL**: Where your data lives (the database)
- **JavaScript/TypeScript**: What you'll write to interact with data

Don't worry if you don't know any of this yet. We'll explain everything.

---

## What You're Going to Build

Your job is to build features for this legal case management system.

**Some examples:**
- Display a list of open cases
- Create a new case
- Add time entries to a case
- Generate an invoice
- Show which attorney worked on what

**The good news:** Prisma makes this REALLY easy.

---

## The Basics in Plain English

### What is a Database?

A database is like a **filing cabinet for your company**. Instead of physical files, you have digital information organized in tables.

```
FILING CABINET = DATABASE
├─ Drawer 1 = Cases Table
│  ├─ Folder: Case #1 (Smith v. Jones)
│  ├─ Folder: Case #2 (Doe v. Williams)
│  └─ Folder: Case #3 (Brown v. Green)
├─ Drawer 2 = Staff Table
│  ├─ Folder: John (Attorney)
│  ├─ Folder: Jane (Staff)
│  └─ Folder: Bob (Attorney)
└─ Drawer 3 = Contacts Table
   ├─ Folder: Alice (Client)
   └─ Folder: Judge Smith (Judge)
```

### What is a Table?

A table is like a **spreadsheet**. It has rows and columns.

```
CASES TABLE:
┌─────────┬───────────────────┬────────────────────┬──────────┐
│ ID      │ Case Number       │ Case Name          │ Status   │
├─────────┼───────────────────┼────────────────────┼──────────┤
│ 1       │ 2025-001          │ Smith v. Jones     │ OPEN     │
│ 2       │ 2025-002          │ Doe v. Williams    │ OPEN     │
│ 3       │ 2025-003          │ Brown v. Green     │ CLOSED   │
└─────────┴───────────────────┴────────────────────┴──────────┘

Each ROW = One case
Each COLUMN = One piece of info about that case
```

### What is a Row?

One row = One thing. One case. One person. One time entry.

```
One row from CASES TABLE:
┌─────────────────────────────────────────────┐
│ ID: 1                                       │
│ Case Number: 2025-001                       │
│ Case Name: Smith v. Jones                   │
│ Status: OPEN                                │
└─────────────────────────────────────────────┘
```

### What is a Column?

One column = One type of information. All in that column is the same type of data.

```
CASE NAME column (all case names):
├─ Smith v. Jones
├─ Doe v. Williams
└─ Brown v. Green

STATUS column (all statuses):
├─ OPEN
├─ OPEN
└─ CLOSED
```

### What is a Relationship?

A relationship connects two tables.

**Example:** A Case needs to know who the client is.

```
Without a relationship:
┌──────────────────┐
│ Case Table       │
├──────────────────┤
│ Case Name        │
│ Client Name      │ ← We store the name here (bad!)
│ Status           │
└──────────────────┘

With a relationship:
┌──────────────────┐         ┌──────────────────┐
│ Case Table       │         │ Contact Table    │
├──────────────────┤         ├──────────────────┤
│ Case Name        │         │ Contact Name     │
│ Client ID → 1 ──────────→ │ 1. Alice Johnson │
│ Status           │         │ 2. Bob Smith     │
└──────────────────┘         └──────────────────┘

We just store the ID, then look up the full info elsewhere.
```

**Why is this better?**
- If Alice changes her phone number, we change it in ONE place
- We don't store her name 100 times in the Cases table
- We keep data clean and organized

---

## Your Database is Like...

### ...A Restaurant System

```
RESTAURANTS TABLE:
├─ Restaurant ID: 1
└─ Name: "Pizza Palace"

EMPLOYEES TABLE:
├─ Employee ID: 1
├─ Name: John
├─ Restaurant ID: 1 (works at Pizza Palace)

ORDERS TABLE:
├─ Order ID: 1
├─ Employee ID: 1 (John took this order)
├─ Restaurant ID: 1 (at Pizza Palace)

MENU ITEMS TABLE:
├─ Item ID: 1
├─ Name: Pepperoni Pizza
├─ Restaurant ID: 1 (served at Pizza Palace)
```

**In our law firm system:**
```
ACCOUNTS TABLE:
├─ Account ID: 1
└─ Firm Name: "Smith & Associates"

STAFF TABLE:
├─ Staff ID: 1
├─ Name: John
├─ Account ID: 1 (works at Smith & Associates)

CASES TABLE:
├─ Case ID: 1
├─ Case Name: Smith v. Jones
├─ Account ID: 1 (at Smith & Associates)

TIME ENTRIES TABLE:
├─ Entry ID: 1
├─ Staff ID: 1 (John tracked this)
├─ Case ID: 1 (on Smith v. Jones)
├─ Hours: 2.5
├─ Account ID: 1 (at Smith & Associates)
```

See the pattern? Everything connects through IDs.

---

## The 22 Things You Need to Know

Your system has 22 "tables" (called models in Prisma). You don't need to memorize all of them. Here are the main ones:

### Core Models (The Important Ones)

#### 1. **Account** = The Law Firm
```
Think of it as: The company
Stores: Firm name, address, email
In real terms: Your employer
```

#### 2. **Staff** = Employees
```
Think of it as: People who work there
Stores: Name, email, job title, pay rate
In real terms: Attorneys, assistants, managers
```

#### 3. **Case** = Legal Matter
```
Think of it as: A lawsuit
Stores: Case number, name, status, client
In real terms: "Smith v. Jones Manufacturing"
```

#### 4. **Contact** = People & Organizations
```
Think of it as: Anyone involved
Stores: Name, email, phone, address
In real terms: Clients, judges, opposing counsel
```

#### 5. **Document** = Files
```
Think of it as: Uploaded legal documents
Stores: File name, type, where it's stored
In real terms: Contracts, motions, briefs
```

#### 6. **Event** = Meetings & Hearings
```
Think of it as: Calendar items
Stores: Date, time, attendees, location
In real terms: Court hearings, client meetings
```

#### 7. **TimeEntry** = Hours Worked
```
Think of it as: Time tracking sheet
Stores: Who worked, what case, how many hours, rate
In real terms: Billing data
```

#### 8. **Expense** = Costs
```
Think of it as: Money spent
Stores: What it was for, how much, date
In real terms: Court filing fees, expert witnesses
```

#### 9. **Task** = To-Do Items
```
Think of it as: Things to do
Stores: What needs to be done, who it's for, due date
In real terms: "Research statutes", "Call client"
```

#### 10. **Activity** = Work Categories
```
Think of it as: Labels for what you're doing
Stores: Names like "Client Meeting", "Research", "Court Appearance"
In real terms: Why you're logging time
```

### Supporting Models (Less Common)

The other 12 models support these main ones. You don't need to know them well yet.

```
TypeOfAction, CauseOfAction = Legal categorization
Lead = Potential clients
CaseStaff = Which staff work on which cases
EventContact = Who attends events
TimeSheet = Summary of time entries
Reminder = Notifications
Requirement = Case requirements
Update = Notes about cases
ActivityLog = History
BankAccount = Firm bank info
Folder = File organization
```

---

## How Prisma Works

### The Basic Idea

**Instead of writing SQL, you write JavaScript that looks simple.**

### SQL (The Old Way)

```sql
SELECT * FROM cases WHERE case_status = 'OPEN';
```

You have to write SQL. Gross.

### Prisma (The New Way)

```javascript
const openCases = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }
});
```

Much nicer! It reads like English.

### What is `prisma.case`?

`prisma.case` means "give me access to the Case table". It's your gateway to that data.

### The Main Things You Do

```javascript
// 1. GET ALL RECORDS
const cases = await prisma.case.findMany();

// 2. GET ONE RECORD
const oneCase = await prisma.case.findUnique({
  where: { id: "case-123" }
});

// 3. CREATE A RECORD
const newCase = await prisma.case.create({
  data: {
    caseNumber: "2025-001",
    caseName: "Smith v. Jones"
  }
});

// 4. UPDATE A RECORD
const updated = await prisma.case.update({
  where: { id: "case-123" },
  data: { caseStatus: "CLOSED" }
});

// 5. DELETE A RECORD
await prisma.case.delete({
  where: { id: "case-123" }
});
```

That's it! Five operations. You'll use these 90% of the time.

---

## Your First Query (Copy & Paste)

### Setup (Do This Once)

```bash
# 1. Install Prisma in your project
npm install @prisma/client

# 2. Set your database URL
# Create .env file:
DATABASE_URL="postgresql://user:password@localhost:5432/lawfirm"

# 3. That's it!
```

### First Query - Get All Cases

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllCases() {
  const cases = await prisma.case.findMany();
  console.log(cases);
}

getAllCases();
```

**What this does:**
1. Imports Prisma
2. Creates a connection to the database
3. Gets ALL cases
4. Prints them to console

### Second Query - Get One Case

```javascript
async function getOneCase() {
  const oneCase = await prisma.case.findUnique({
    where: { id: "case-123" }
  });
  console.log(oneCase);
}
```

**What this does:**
1. Finds the case with id "case-123"
2. If it doesn't exist, returns null
3. Prints it to console

### Third Query - Create a Case

```javascript
async function createCase() {
  const newCase = await prisma.case.create({
    data: {
      accountId: "firm-123",
      caseNumber: "2025-001",
      caseName: "Smith v. Jones",
      practiceArea: "PERSONAL_INJURY",
      caseStage: "PRE_CHARGE",
      caseStatus: "OPEN",
      feeType: "CONTINGENCY",
      primaryContactId: "contact-123",
      createdById: "staff-123",
      updatedById: "staff-123"
    }
  });
  console.log("Created:", newCase);
}
```

**What this does:**
1. Creates a new case
2. Fills in all the required fields
3. Returns the new case with its generated ID
4. Prints it to console

---

## Common Tasks

### Task 1: Get All Cases for a Firm

```javascript
const cases = await prisma.case.findMany({
  where: {
    accountId: "firm-123"  // Only this firm's cases
  }
});
```

**In English:** "Get me all cases where the account ID is firm-123"

### Task 2: Get Open Cases Only

```javascript
const openCases = await prisma.case.findMany({
  where: {
    accountId: "firm-123",
    caseStatus: "OPEN"  // Only open ones
  }
});
```

**In English:** "Get me all cases for firm-123 that are OPEN"

### Task 3: Get a Case with Its Client

```javascript
const caseWithClient = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true  // Get the client too
  }
});

console.log(caseWithClient.primaryContact.name);  // Alice Johnson
```

**In English:** "Get me case-123 AND include the contact info"

### Task 4: Get a Case with EVERYTHING

```javascript
const complete = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true,      // Client
    caseStaff: {
      include: { staff: true }  // Attorneys on the case
    },
    timeEntries: true,         // Hours tracked
    expenses: true,            // Costs
    documents: true,           // Files
    events: true               // Meetings
  }
});

console.log(complete.caseName);
console.log(complete.primaryContact.name);
console.log(complete.caseStaff.length);
```

**In English:** "Get me everything about case-123"

### Task 5: Get Tasks Assigned to Someone

```javascript
const myTasks = await prisma.task.findMany({
  where: {
    assignedStaffIds: {
      has: "staff-123"  // Is staff-123 in this list?
    },
    status: "OPEN"
  }
});
```

**In English:** "Get all open tasks where staff-123 is assigned"

### Task 6: Count Cases

```javascript
const count = await prisma.case.count({
  where: {
    accountId: "firm-123",
    caseStatus: "OPEN"
  }
});

console.log(`We have ${count} open cases`);
```

**In English:** "How many open cases does this firm have?"

### Task 7: Sum Time on a Case

```javascript
const timeStats = await prisma.timeEntry.aggregate({
  where: {
    caseId: "case-123",
    billable: true
  },
  _sum: {
    durationHours: true,
    total: true
  }
});

console.log(`Total hours: ${timeStats._sum.durationHours}`);
console.log(`Total billed: $${timeStats._sum.total}`);
```

**In English:** "How many billable hours on this case and how much money?"

### Task 8: Update a Case Status

```javascript
const updated = await prisma.case.update({
  where: { id: "case-123" },
  data: {
    caseStatus: "CLOSED",
    updatedById: "staff-456"  // Who's making this change
  }
});

console.log("Updated to:", updated.caseStatus);
```

**In English:** "Mark case-123 as CLOSED"

### Task 9: Delete a Task

```javascript
await prisma.task.delete({
  where: { id: "task-123" }
});

console.log("Task deleted");
```

**In English:** "Delete task-123"

### Task 10: Create a Time Entry (Log Hours)

```javascript
const timeEntry = await prisma.timeEntry.create({
  data: {
    accountId: "firm-123",
    caseId: "case-123",
    staffId: "staff-123",
    activityId: "activity-meeting",
    entryDate: new Date("2025-01-15"),
    durationHours: new Decimal("2.5"),  // 2.5 hours
    billable: true,
    rate: new Decimal("350"),           // $350/hour
    total: new Decimal("875"),          // 2.5 * 350
    status: "OPEN",
    createdById: "staff-123",
    updatedById: "staff-123"
  }
});

console.log(`Logged ${timeEntry.durationHours} hours for $${timeEntry.total}`);
```

**In English:** "Log that John worked 2.5 hours at $350/hour on a case"

---

## Troubleshooting

### Problem: "Property 'case' does not exist on type 'PrismaClient'"

**What it means:** You're trying to use `prisma.case` but Prisma doesn't know about it.

**Fix:**
```javascript
// Make sure you have the correct import
import { PrismaClient } from "@prisma/client";

// Make sure the schema has a model named "case"
// (Actually it should be "Case" with capital C)
```

### Problem: "Error: ENOENT: no such file or directory, open '.env'"

**What it means:** Prisma can't find your database URL.

**Fix:**
```bash
# Create a .env file in your project root
# Add this line:
DATABASE_URL="postgresql://user:password@host:5432/database"

# Don't forget to replace with real values!
```

### Problem: "TypeError: Cannot read property 'name' of undefined"

**What it means:** You tried to access something that doesn't exist.

```javascript
// DON'T do this:
const caseWithClient = await prisma.case.findUnique({
  where: { id: "case-123" }
});
console.log(caseWithClient.primaryContact.name);  // ERROR!
// You didn't include primaryContact!

// DO this:
const caseWithClient = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true
  }
});
console.log(caseWithClient.primaryContact.name);  // Works!
```

### Problem: "ValidationError: Unknown field for case"

**What it means:** You're trying to set a field that doesn't exist.

```javascript
// DON'T do this:
const newCase = await prisma.case.create({
  data: {
    case_name: "Smith v. Jones"  // Wrong field name!
  }
});

// DO this:
const newCase = await prisma.case.create({
  data: {
    caseName: "Smith v. Jones"  // Correct!
  }
});
```

### Problem: "Error: Missing the following required fields: createdById"

**What it means:** You forgot to provide a required field.

```javascript
// DON'T do this:
const newCase = await prisma.case.create({
  data: {
    caseName: "Smith v. Jones"
    // Missing createdById!
  }
});

// DO this:
const newCase = await prisma.case.create({
  data: {
    caseName: "Smith v. Jones",
    createdById: "staff-123",  // Add required fields
    updatedById: "staff-123",
    accountId: "firm-123",
    // ... etc
  }
});
```

### Problem: "No operator has been applied"

**What it means:** Your `where` clause syntax is wrong.

```javascript
// DON'T do this:
const cases = await prisma.case.findMany({
  where: { id: "case-123" }  // This won't work for findMany!
});

// DO this:
const oneCase = await prisma.case.findUnique({
  where: { id: "case-123" }  // Use findUnique for single record
});

// OR if you want multiple:
const cases = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }  // Multiple records can have same status
});
```

---

## Frequently Asked Questions

### Q: What's the difference between findUnique and findMany?

**A:**
```javascript
// findUnique = Get ONE specific record
const oneCase = await prisma.case.findUnique({
  where: { id: "case-123" }  // This ID exists only once
});

// findMany = Get MULTIPLE records
const cases = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }  // Many cases can be open
});
```

**In English:**
- `findUnique` = "Get THE case with this ID"
- `findMany` = "Get ALL cases where..."

### Q: What's `include` vs `select`?

**A:**
```javascript
// include = Get EVERYTHING PLUS related data
const caseWithClient = await prisma.case.findUnique({
  where: { id: "case-123" },
  include: {
    primaryContact: true  // Get all contact fields
  }
});
console.log(caseWithClient.caseName);  // Available
console.log(caseWithClient.caseNumber);  // Available
console.log(caseWithClient.primaryContact.name);  // Available

// select = Get ONLY what you specify
const caseNameOnly = await prisma.case.findUnique({
  where: { id: "case-123" },
  select: {
    caseName: true,  // Only get this field
    primaryContact: { select: { name: true } }  // And this from contact
  }
});
console.log(caseNameOnly.caseName);  // Available
console.log(caseNameOnly.caseNumber);  // NOT available
```

**In English:**
- `include` = "Give me everything + this extra stuff"
- `select` = "Give me ONLY these things"

### Q: Why do all tables have `accountId`?

**A:** Because multiple law firms use the same system!

```
Firm A        Firm B
(accountId 1) (accountId 2)
├─ Cases      ├─ Cases
├─ Staff      ├─ Staff
└─ Documents  └─ Documents

When Firm A queries, we MUST filter by accountId: "1"
Otherwise they'd see Firm B's secret cases!

Always do this:
where: { accountId: "firm-id" }
```

### Q: Why do records have `createdById` and `updatedById`?

**A:** For auditing - "Who touched this record and when?"

```javascript
// This case was created by John and updated by Jane
case.createdById = "john-id"
case.updatedById = "jane-id"

// Compliance question: "Who last changed this case?"
// Answer: You can look it up!
```

### Q: What's a "Decimal"?

**A:** It's for storing money accurately.

```javascript
// DON'T use regular numbers for money:
rate: 350.50  // Can lose precision!

// DO use Decimal:
import { Decimal } from "@prisma/client/runtime/library";
rate: new Decimal("350.50")  // Accurate!
```

### Q: When I create a record, which fields are required?

**A:** Look at the schema. Fields without `?` are required.

```prisma
model Case {
  id String @id
  accountId String        // REQUIRED (no ?)
  caseName String         // REQUIRED (no ?)
  caseStatus CaseStatus   // REQUIRED (no ?)
  caseNumber String?      // OPTIONAL (has ?)
  primaryContactId String // REQUIRED (no ?)
}
```

**In English:** If there's no `?`, you MUST provide it.

### Q: How do I know what values are valid?

**A:** Look for enums in the schema.

```prisma
enum CaseStatus {
  OPEN
  GET_REVIEW
  CLOSED
}

// Valid values for caseStatus:
// "OPEN", "GET_REVIEW", "CLOSED"
// Nothing else!
```

### Q: What's this `where` clause syntax?

**A:** It's how you filter data.

```javascript
// Simple filters:
where: { caseStatus: "OPEN" }
// Get records where status equals OPEN

// Multiple filters (AND):
where: { 
  accountId: "firm-123",
  caseStatus: "OPEN"
}
// Get records where BOTH conditions are true

// Range filters:
where: {
  createdAt: {
    gte: new Date("2025-01-01")  // Greater than or equal
  }
}
// Get records created on or after Jan 1

// Other operators:
where: {
  durationHours: { lt: 10 }  // Less than
  durationHours: { lte: 10 } // Less than or equal
  durationHours: { gt: 10 }  // Greater than
  durationHours: { gte: 10 } // Greater than or equal
  durationHours: { not: 0 }  // Not equal
}
```

### Q: Can I do multiple queries at once?

**A:** No, but you can do them back-to-back.

```javascript
// This works:
const cases = await prisma.case.findMany({ ... });
const contacts = await prisma.contact.findMany({ ... });
const tasks = await prisma.task.findMany({ ... });

// This also works (parallel):
const [cases, contacts, tasks] = await Promise.all([
  prisma.case.findMany({ ... }),
  prisma.contact.findMany({ ... }),
  prisma.task.findMany({ ... })
]);
```

### Q: What if a record doesn't exist?

**A:**
```javascript
// findUnique returns null (not an error)
const notFound = await prisma.case.findUnique({
  where: { id: "nonexistent" }
});
console.log(notFound);  // null (not undefined!)

// So always check:
if (!notFound) {
  console.log("Case not found");
}

// findMany returns empty array
const noCases = await prisma.case.findMany({
  where: { caseStatus: "NONEXISTENT" }
});
console.log(noCases);  // []
console.log(noCases.length);  // 0
```

---

## Summary

### The Golden Rules

1. **Always filter by accountId** - Multiple firms use this system
2. **Use include to get related data** - Don't make multiple queries
3. **Check if data exists** - findUnique returns null
4. **Provide all required fields** - Check the schema
5. **Use the correct field names** - They're in camelCase
6. **Set createdById and updatedById** - For audit trail

### The 5 Operations You'll Use 90% of the Time

```javascript
// 1. Get multiple records
await prisma.model.findMany({ where: {...} })

// 2. Get one record
await prisma.model.findUnique({ where: {...} })

// 3. Create a record
await prisma.model.create({ data: {...} })

// 4. Update a record
await prisma.model.update({ where: {...}, data: {...} })

// 5. Delete a record
await prisma.model.delete({ where: {...} })
```

### You've Got This!

This is a real, production-ready system. Don't be intimidated. Start small, read the schema when you're confused, and ask questions!

---

## Quick Reference

### Important Terms

| Term | Means | Example |
|------|-------|---------|
| Model | Table | `prisma.case` |
| Record | One row | One case, one person |
| Field | Column | caseName, status |
| ID | Unique identifier | "case-123" |
| Foreign Key | ID pointing to another table | `primaryContactId` |
| Relationship | Connection between tables | Case → Contact |
| Query | Request for data | `findMany`, `create` |
| accountId | Which firm owns this | "firm-123" |
| createdById | Who created it | "staff-123" |
| updatedById | Who last changed it | "staff-456" |

### Common Models

| Model | Purpose | Example |
|-------|---------|---------|
| Account | Law firm | "Smith & Associates" |
| Staff | Employees | "John (Attorney)" |
| Case | Legal matter | "Smith v. Jones" |
| Contact | Client/judge/court | "Alice Johnson (Client)" |
| Document | Files | "Contract.pdf" |
| Event | Meeting/hearing | "Court hearing Jan 15" |
| TimeEntry | Hours worked | "2.5 hours @ $350/hr" |
| Expense | Costs | "$500 court filing fee" |
| Task | To-do item | "Research statutes" |
| Activity | Work category | "Client Meeting" |

### Common Queries

```javascript
// Get all cases for my firm
await prisma.case.findMany({ where: { accountId: "my-firm" } })

// Get one case with everything
await prisma.case.findUnique({
  where: { id },
  include: { primaryContact: true, caseStaff: true, timeEntries: true }
})

// Count open cases
await prisma.case.count({ where: { caseStatus: "OPEN" } })

// Get tasks assigned to me
await prisma.task.findMany({
  where: { assignedStaffIds: { has: "my-id" } }
})

// Total billable hours on a case
await prisma.timeEntry.aggregate({
  where: { caseId, billable: true },
  _sum: { durationHours: true }
})
```

---

## Next Steps

1. **Read the first part** - Get familiar with basic concepts
2. **Try a query** - Copy one of the examples above and run it
3. **Read the schema** - Open `prisma-schema-FINAL-FIXED.prisma` and look around
4. **Build something small** - Display a list of cases
5. **Ask questions** - There's no such thing as a dumb question

**Welcome to the team!** 🎉