import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStaffForm } from "./useStaffForm";

export function BankingInfoSection() {
  const {
    register,
    formState: { errors },
  } = useStaffForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Banking Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Name */}
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name *</Label>
            <Input id="bankName" {...register("bankName")} />
            {errors.bankName && (
              <p className="text-sm text-destructive">
                {errors.bankName.message}
              </p>
            )}
          </div>

          {/* Routing Number */}
          <div className="space-y-2">
            <Label htmlFor="bankRoutingNumber">Routing Number *</Label>
            <Input
              id="bankRoutingNumber"
              placeholder="e.g. 021000021"
              {...register("bankRoutingNumber")}
            />
            {errors.bankRoutingNumber && (
              <p className="text-sm text-destructive">
                {errors.bankRoutingNumber.message}
              </p>
            )}
          </div>

          {/* Account Number (masked) */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bankAccountNumber">Account Number *</Label>
            <Input
              id="bankAccountNumber"
              type="password" // hides the number while typing
              placeholder="••••••••"
              autoComplete="off"
              {...register("bankAccountNumber")}
            />
            {errors.bankAccountNumber && (
              <p className="text-sm text-destructive">
                {errors.bankAccountNumber.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
