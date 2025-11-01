"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStaffForm } from "./useStaffForm";

export function EmploymentInfoSection() {
  const { control, watch } = useStaffForm();
  const applicationAdmin = watch("applicationAdmin");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Employment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="hireDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="leaveDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="staffGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff Group *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ATTORNEY">Attorney</SelectItem>
                    <SelectItem value="LAW_CLERK">Law Clerk</SelectItem>
                    <SelectItem value="STAFF">Staff</SelectItem>
                    <SelectItem value="FIRM_MANAGER">Firm Manager</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="reportingToId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reports To (Staff ID)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter staff ID"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="applicationAdmin"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 pt-8">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">
                  Application Admin
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
