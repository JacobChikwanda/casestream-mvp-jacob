import { StaffForm } from "@/components/form/forms";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Add or edit staff member information
          </p>
        </div>
        <StaffForm />
      </div>
    </div>
  );
}
