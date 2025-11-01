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
import { useStaffForm } from "@/hooks/useStaffForm";

export function CompensationSection() {
  const { control, watch } = useStaffForm();

  const enableOvertime = watch("enableOvertime");
  const enableAutoBreakDeduction = watch("enableAutoBreakDeduction");
  const enablePerformanceIncentives = watch("enablePerformanceIncentives");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Compensation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="defaultCaseRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Case Rate ($) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pay Type *</FormLabel>
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SALARY">Salary</SelectItem>
                    <SelectItem value="HOURLY">Hourly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pay Rate ($) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="mileageReimbursement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage Reimbursement ($/mile) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Overtime */}
        <div className="space-y-4 pt-4 border-t">
          <FormField
            control={control}
            name="enableOvertime"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-semibold">
                  Enable Overtime
                </FormLabel>
              </FormItem>
            )}
          />

          {enableOvertime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              <FormField
                control={control}
                name="overtimeRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overtime Rate (multiplier) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="weeklyBaseHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Base Hours *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Auto Break */}
        <div className="space-y-4 pt-4 border-t">
          <FormField
            control={control}
            name="enableAutoBreakDeduction"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-semibold">
                  Enable Auto Break Deduction
                </FormLabel>
              </FormItem>
            )}
          />

          {enableAutoBreakDeduction && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              <FormField
                control={control}
                name="breaktimeBaseHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Break Time Base Hours *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.25"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="breaktimeRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Break Time Rate ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Performance Incentives */}
        <div className="space-y-4 pt-4 border-t">
          <FormField
            control={control}
            name="enablePerformanceIncentives"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-semibold">
                  Enable Performance Incentives
                </FormLabel>
              </FormItem>
            )}
          />

          {enablePerformanceIncentives && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              <FormField
                control={control}
                name="intakeStaffIncentive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intake Staff Incentive ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="intakeOverrideIncentive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intake Override Incentive ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="managerOverrideIncentive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Override Incentive ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="referralIncentive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Incentive ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
