import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStaffForm } from "./useStaffForm";

export function EmploymentInfoSection() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useStaffForm();

  const applicationAdmin = watch("applicationAdmin");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Employment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hireDate">Hire Date *</Label>
            <Input id="hireDate" type="date" {...register("hireDate")} />
            {errors.hireDate && (
              <p className="text-sm text-destructive">
                {errors.hireDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaveDate">Leave Date</Label>
            <Input id="leaveDate" type="date" {...register("leaveDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentStatus">Employment Status *</Label>
            <Select
              onValueChange={(v) => setValue("employmentStatus", v as any)}
              defaultValue="ACTIVE"
            >
              <SelectTrigger id="employmentStatus">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffGroup">Staff Group *</Label>
            <Select
              onValueChange={(v) => setValue("staffGroup", v as any)}
              defaultValue="STAFF"
            >
              <SelectTrigger id="staffGroup">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATTORNEY">Attorney</SelectItem>
                <SelectItem value="LAW_CLERK">Law Clerk</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
                <SelectItem value="FIRM_MANAGER">Firm Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportingToId">Reports To (Staff ID)</Label>
            <Input
              id="reportingToId"
              {...register("reportingToId")}
              placeholder="Enter staff ID"
            />
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="applicationAdmin"
              checked={applicationAdmin}
              onCheckedChange={(c) =>
                setValue("applicationAdmin", c as boolean)
              }
            />
            <Label htmlFor="applicationAdmin" className="cursor-pointer">
              Application Admin
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
