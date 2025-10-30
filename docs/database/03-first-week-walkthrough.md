# 📅 Your First Week - Step by Step

> Follow this guide day by day. Each day should take 1-2 hours.

---

## 🗓️ DAY 1: Understanding the Basics

### Goal
Understand what you're building and the basic concepts of Prisma.

### Your Tasks

**Morning (30 minutes):**
1. Read `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md` sections 1-3:
   - Before You Start
   - What You're Going to Build
   - The Basics in Plain English

2. Think about these questions:
   - What is a database?
   - What is a table?
   - What is a row?
   - What is a column?

**Afternoon (30 minutes):**
1. Read section "Your Database is Like..." and "The 22 Things You Need to Know"

2. Write down the 10 main models (Account, Staff, Case, Contact, etc.) and one sentence what each does

3. Look at `prisma-schema-FINAL-FIXED.prisma` and skim through it. Don't worry if you don't understand everything.

### By End of Day
You should be able to:
- Explain what Prisma is in one sentence
- Name 5 models in the system
- Understand basic database concepts

### Questions to Ask (It's OK!)
- "What's the difference between a model and a table?"
- "Why do we use accountId everywhere?"
- "What does 'foreign key' mean?"

---

## 🗓️ DAY 2: Your First Query

### Goal
Write actual code that connects to the database.

### Your Tasks

**Setup (15 minutes):**

1. Create a new file called `test.js` in your project:

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Connected to database!");
  
  // Close the connection
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

2. Run it:
```bash
node test.js
# Should print: Connected to database!
```

**Query Practice (45 minutes):**

1. Copy from `02-QUICK-CHEAT-SHEET.md` - "The 5 Main Queries" section

2. Update `test.js` to try each query:

```javascript
// Try this query:
const allCases = await prisma.case.findMany();
console.log(`Found ${allCases.length} cases`);

// Try this one:
const oneCaseCount = await prisma.case.count();
console.log(`Total cases in database: ${oneCaseCount}`);

// Try with a filter:
const openCases = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }
});
console.log(`Open cases: ${openCases.length}`);
```

3. Run each and see what happens

**Troubleshooting (Likely Issues):**

If you see: "Cannot find module '@prisma/client'"
```bash
npm install @prisma/client
```

If you see: "Error: ENOENT: no such file or directory, open '.env'"
```bash
# Create .env file and add:
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### By End of Day
You should:
- Have Prisma installed and working
- Have run at least 3 queries
- See real data from the database
- Understand what `findMany` and `count` do

### Questions to Ask
- "How do I know which queries are available?"
- "What should I do if I get an error?"
- "Can I run multiple queries in the same file?"

---

## 🗓️ DAY 3: Understanding Relationships

### Goal
Learn how tables connect to each other and how to get related data.

### Your Tasks

**Reading (30 minutes):**

1. Read `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md` section "How Prisma Works"

2. Read the FAQ section: "What's include vs select?"

3. Look at `02-QUICK-CHEAT-SHEET.md` section "Include Related Data"

**Coding (45 minutes):**

1. Write a query to get a case WITH its client:

```javascript
const caseWithClient = await prisma.case.findMany({
  where: { 
    caseStatus: "OPEN"
  },
  include: {
    primaryContact: true  // Get the client too!
  },
  take: 1  // Just get one
});

console.log("Case:", caseWithClient[0]?.caseName);
console.log("Client:", caseWithClient[0]?.primaryContact?.name);
```

2. Try to get a case with EVERYTHING:

```javascript
const complete = await prisma.case.findMany({
  include: {
    primaryContact: true,
    caseStaff: { include: { staff: true } },
    timeEntries: true,
    expenses: true,
    documents: true
  },
  take: 1
});

console.log(JSON.stringify(complete, null, 2));
```

3. Notice what you can access:
   - `complete[0].primaryContact.name` ← The client name
   - `complete[0].caseStaff[0].staff.name` ← Staff on the case
   - `complete[0].timeEntries.length` ← How many time entries

### By End of Day
You should:
- Understand what `include` does
- Be able to get related data from the database
- Know the difference between a direct field and related data

### Questions to Ask
- "Why do I need to use include?"
- "What if I don't include something?"
- "Can I include nested relationships?"

---

## 🗓️ DAY 4: Filtering Data

### Goal
Learn how to get specific records you're interested in.

### Your Tasks

**Reading (20 minutes):**

1. Read `02-QUICK-CHEAT-SHEET.md` section "Filter Data (Where Clause)"

2. Read `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md` FAQ: "What's this where clause syntax?"

**Coding (40 minutes):**

1. Try different filters:

```javascript
// Just open cases
const open = await prisma.case.findMany({
  where: { caseStatus: "OPEN" }
});
console.log("Open cases:", open.length);

// Open cases for a specific firm
const firmCases = await prisma.case.findMany({
  where: {
    accountId: "firm-123",  // Real firm ID
    caseStatus: "OPEN"
  }
});
console.log("This firm's open cases:", firmCases.length);

// Cases with specific practice area
const personalInjury = await prisma.case.findMany({
  where: {
    practiceArea: "PERSONAL_INJURY"
  }
});

// Cases created this week
const recent = await prisma.case.findMany({
  where: {
    createdAt: {
      gte: new Date(new Date().setDate(new Date().getDate() - 7))
    }
  }
});
console.log("Recent cases:", recent.length);
```

2. Combine with `include`:

```javascript
const result = await prisma.case.findMany({
  where: {
    caseStatus: "OPEN",
    accountId: "firm-123"
  },
  include: {
    primaryContact: true
  }
});

// Now you have both: open cases AND their clients
result.forEach(c => {
  console.log(`${c.caseName} (Client: ${c.primaryContact.name})`);
});
```

### By End of Day
You should:
- Know multiple ways to filter data
- Understand AND logic (multiple conditions)
- Be able to find specific records you need

### Questions to Ask
- "How do I do OR logic?"
- "Can I filter by dates?"
- "What if I want to search text?"

---

## 🗓️ DAY 5: Creating Data

### Goal
Learn how to create new records in the database.

### Your Tasks

**Reading (20 minutes):**

1. Read `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md` section "Your First Query - Third Query (Create a Case)"

2. Read `02-QUICK-CHEAT-SHEET.md` section "Creating Records"

3. Check what fields are required by looking at the schema

**Coding (40 minutes):**

1. Create a new case:

```javascript
const newCase = await prisma.case.create({
  data: {
    // REQUIRED - you must provide these
    accountId: "firm-123",           // Which firm
    caseName: "Test Case",           // Name
    caseStatus: "OPEN",              // Status
    primaryContactId: "contact-123", // Client
    createdById: "staff-123",        // Who created it
    updatedById: "staff-123",        // Who last edited it
    
    // OPTIONAL - nice to have
    caseNumber: "2025-TEST-001",
    practiceArea: "PERSONAL_INJURY",
    caseStage: "PRE_CHARGE"
  }
});

console.log("Created case:", newCase.id);
console.log("Case name:", newCase.caseName);
```

2. Create a task:

```javascript
const task = await prisma.task.create({
  data: {
    accountId: "firm-123",
    taskName: "Review contract",
    priority: "HIGH",
    status: "OPEN",
    dueDate: new Date("2025-02-01"),
    assignedStaffIds: ["staff-123", "staff-456"],  // Multiple people
    createdById: "staff-123",
    updatedById: "staff-123"
  }
});

console.log("Created task:", task.id);
```

3. Create a time entry:

```javascript
import { Decimal } from "@prisma/client/runtime/library";

const timeEntry = await prisma.timeEntry.create({
  data: {
    accountId: "firm-123",
    caseId: newCase.id,  // Use the case we just created
    staffId: "staff-123",
    activityId: "activity-123",
    entryDate: new Date(),
    durationHours: new Decimal("2.5"),
    billable: true,
    rate: new Decimal("350"),
    total: new Decimal("875"),
    status: "OPEN",
    createdById: "staff-123",
    updatedById: "staff-123"
  }
});

console.log("Logged hours on case");
```

### By End of Day
You should:
- Know which fields are required
- Be able to create records
- Understand why we set createdById and updatedById

### Common Mistakes (Avoid These!)
- ❌ Forgetting required fields
- ❌ Using wrong field names
- ❌ Forgetting accountId (your firm won't see it!)
- ❌ Not setting createdById/updatedById

### Questions to Ask
- "What if I don't know a required value?"
- "Can I get the new record's ID?"
- "What happens if I make a mistake?"

---

## 🗓️ WEEK 1, FRIDAY: Putting It Together

### Goal
Build a mini feature using everything you've learned.

### Your Challenge: Build a "My Cases" Page

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMyCases(firmId, staffId) {
  // Get all open cases for my firm
  const cases = await prisma.case.findMany({
    where: {
      accountId: firmId,
      caseStatus: "OPEN"
    },
    include: {
      primaryContact: true,  // Get client
      caseStaff: {
        include: { staff: true }
      },
      timeEntries: {
        where: { staffId: staffId }  // Only my time entries
      }
    }
  });

  // Print formatted results
  console.log("=== MY CASES ===\n");
  
  for (const c of cases) {
    console.log(`📋 ${c.caseName}`);
    console.log(`   Client: ${c.primaryContact.name}`);
    console.log(`   Status: ${c.caseStatus}`);
    console.log(`   My hours: ${c.timeEntries.length} entries`);
    console.log("");
  }

  return cases;
}

// Run it
getMyCases("firm-123", "staff-123");
```

### Your Challenge: Create a Time Entry

```javascript
import { Decimal } from "@prisma/client/runtime/library";

async function logHours(firmId, caseId, staffId, hours, activity) {
  // First, check the case exists
  const caseData = await prisma.case.findUnique({
    where: { id: caseId }
  });

  if (!caseData) {
    console.log("Case not found!");
    return;
  }

  // Create the time entry
  const rate = new Decimal("350");  // $350/hour
  const durationHours = new Decimal(hours.toString());
  const total = rate.times(durationHours);

  const timeEntry = await prisma.timeEntry.create({
    data: {
      accountId: firmId,
      caseId: caseId,
      staffId: staffId,
      activityId: activity,  // "Client Meeting", etc
      entryDate: new Date(),
      durationHours,
      billable: true,
      rate,
      total,
      status: "OPEN",
      createdById: staffId,
      updatedById: staffId
    }
  });

  console.log(`✅ Logged ${hours} hours for $${total}`);
  return timeEntry;
}

// Run it
logHours(
  "firm-123",
  "case-123",
  "staff-123",
  2.5,
  "activity-meeting"
);
```

### By End of Week
You should:
- Be able to read data from the database
- Be able to create new records
- Understand relationships between tables
- Feel confident writing Prisma queries

### Next Week
- Learn about updating records
- Learn about deleting records
- Learn about more complex queries
- Start building real features

---

## ✅ Week 1 Checklist

- [ ] Day 1: Read basic concepts
- [ ] Day 2: Write first query
- [ ] Day 3: Get related data with include
- [ ] Day 4: Filter data with where
- [ ] Day 5: Create new records
- [ ] Friday: Build a mini feature
- [ ] Asked for help when stuck (Good!)
- [ ] Didn't get frustrated (Normal to be confused!)

---

## 🆘 Stuck? Try This

1. **Check the error message** - Copy it into Google
2. **Look at the cheat sheet** - `02-QUICK-CHEAT-SHEET.md`
3. **Look at the troubleshooting** - `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md`
4. **Print what you got** - `console.log(result)`
5. **Ask a teammate** - It's totally normal to ask!

---

## 💡 Tips for Success

1. **Start small** - Get one query working before moving to complex ones
2. **Use the schema** - Always check what fields exist
3. **Read error messages** - They usually tell you exactly what's wrong
4. **Copy examples** - Copy from the cheat sheet, don't reinvent
5. **Ask questions** - There's no such thing as a dumb question
6. **Take breaks** - Programming takes concentration
7. **Celebrate wins** - You got a query working? 🎉

---

## 📚 Your Resources

- **Onboarding Guide**: `01-ONBOARDING-GUIDE-FOR-NEW-TEAM-MEMBERS.md` (Main guide)
- **Cheat Sheet**: `02-QUICK-CHEAT-SHEET.md` (Quick reference)
- **Schema**: `prisma-schema-FINAL-FIXED.prisma` (What fields exist)
- **Visual Guide**: `VISUAL-QUICK-REFERENCE.txt` (Diagrams)
- **Prisma Docs**: https://www.prisma.io/docs/ (Official docs)

---

**You've got this! 🚀**