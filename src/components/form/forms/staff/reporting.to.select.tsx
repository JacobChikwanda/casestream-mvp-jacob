"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useStaffList } from "@/hooks/useStaffList";
interface ReportingToSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function ReportingToSelect({
  value,
  onValueChange,
  disabled = false,
}: ReportingToSelectProps) {
  const { staff, loading, error } = useStaffList();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted">
        <Spinner className="h-4 w-4" />
        <span className="text-sm text-muted-foreground">Loading staff...</span>
      </div>
    );
  }

  return (
    <Select
      value={value || ""}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a staff member" />
      </SelectTrigger>
      <SelectContent>
        {staff.length === 0 ? (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            No staff members available
          </div>
        ) : (
          staff.map((member) => (
            <SelectItem key={member.id} value={member.id}>
              {member.name} - {member.workEmail}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
