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

export function CompensationSection() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useStaffForm();

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
          <div className="space-y-2">
            <Label htmlFor="defaultCaseRate">Default Case Rate ($) *</Label>
            <Input
              id="defaultCaseRate"
              type="number"
              step="0.01"
              {...register("defaultCaseRate")}
            />
            {errors.defaultCaseRate && (
              <p className="text-sm text-destructive">
                {errors.defaultCaseRate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payType">Pay Type *</Label>
            <Select
              onValueChange={(v) => setValue("payType", v as any)}
              defaultValue="HOURLY"
            >
              <SelectTrigger id="payType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SALARY">Salary</SelectItem>
                <SelectItem value="HOURLY">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payRate">Pay Rate ($) *</Label>
            <Input
              id="payRate"
              type="number"
              step="0.01"
              {...register("payRate")}
            />
            {errors.payRate && (
              <p className="text-sm text-destructive">
                {errors.payRate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileageReimbursement">
              Mileage Reimbursement ($/mile) *
            </Label>
            <Input
              id="mileageReimbursement"
              type="number"
              step="0.01"
              {...register("mileageReimbursement")}
            />
            {errors.mileageReimbursement && (
              <p className="text-sm text-destructive">
                {errors.mileageReimbursement.message}
              </p>
            )}
          </div>
        </div>

        {/* Overtime */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableOvertime"
              checked={enableOvertime}
              onCheckedChange={(c) => setValue("enableOvertime", c as boolean)}
            />
            <Label
              htmlFor="enableOvertime"
              className="cursor-pointer font-semibold"
            >
              Enable Overtime
            </Label>
          </div>

          {enableOvertime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              <div className="space-y-2">
                <Label htmlFor="overtimeRate">
                  Overtime Rate (multiplier) *
                </Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  step="0.01"
                  {...register("overtimeRate")}
                />
                {errors.overtimeRate && (
                  <p className="text-sm text-destructive">
                    {errors.overtimeRate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeklyBaseHours">Weekly Base Hours *</Label>
                <Input
                  id="weeklyBaseHours"
                  type="number"
                  step="0.5"
                  {...register("weeklyBaseHours")}
                />
                {errors.weeklyBaseHours && (
                  <p className="text-sm text-destructive">
                    {errors.weeklyBaseHours.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Auto Break */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableAutoBreakDeduction"
              checked={enableAutoBreakDeduction}
              onCheckedChange={(c) =>
                setValue("enableAutoBreakDeduction", c as boolean)
              }
            />
            <Label
              htmlFor="enableAutoBreakDeduction"
              className="cursor-pointer font-semibold"
            >
              Enable Auto Break Deduction
            </Label>
          </div>

          {enableAutoBreakDeduction && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              <div className="space-y-2">
                <Label htmlFor="breaktimeBaseHours">
                  Break Time Base Hours *
                </Label>
                <Input
                  id="breaktimeBaseHours"
                  type="number"
                  step="0.25"
                  {...register("breaktimeBaseHours")}
                />
                {errors.breaktimeBaseHours && (
                  <p className="text-sm text-destructive">
                    {errors.breaktimeBaseHours.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="breaktimeRate">Break Time Rate ($) *</Label>
                <Input
                  id="breaktimeRate"
                  type="number"
                  step="0.01"
                  {...register("breaktimeRate")}
                />
                {errors.breaktimeRate && (
                  <p className="text-sm text-destructive">
                    {errors.breaktimeRate.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Performance Incentives */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enablePerformanceIncentives"
              checked={enablePerformanceIncentives}
              onCheckedChange={(c) =>
                setValue("enablePerformanceIncentives", c as boolean)
              }
            />
            <Label
              htmlFor="enablePerformanceIncentives"
              className="cursor-pointer font-semibold"
            >
              Enable Performance Incentives
            </Label>
          </div>

          {enablePerformanceIncentives && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
              {[
                {
                  id: "intakeStaffIncentive",
                  label: "Intake Staff Incentive ($)",
                },
                {
                  id: "intakeOverrideIncentive",
                  label: "Intake Override Incentive ($)",
                },
                {
                  id: "managerOverrideIncentive",
                  label: "Manager Override Incentive ($)",
                },
                { id: "referralIncentive", label: "Referral Incentive ($)" },
              ].map(({ id, label }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label} *</Label>
                  <Input
                    id={id}
                    type="number"
                    step="0.01"
                    {...register(id as any)}
                  />
                  {errors[id as keyof typeof errors] && (
                    <p className="text-sm text-destructive">
                      {errors[id as keyof typeof errors]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
