"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStaffForm } from "@/hooks/useStaffForm";

export function BankingInfoSection() {
  const { control } = useStaffForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Banking Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Chase Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bankRoutingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Routing Number *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 021000021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bankAccountNumber"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Account Number *</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
