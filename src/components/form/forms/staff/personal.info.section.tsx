import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStaffForm } from "./useStaffForm";
import { StaffFormData } from "@/lib/validations/staff";

export function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useStaffForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input id="dob" type="date" {...register("dob")} />
            {errors.dob && (
              <p className="text-sm text-destructive">{errors.dob.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Personal Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Personal Phone *</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Work Email */}
          <div className="space-y-2">
            <Label htmlFor="workEmail">Work Email *</Label>
            <Input id="workEmail" type="email" {...register("workEmail")} />
            {errors.workEmail && (
              <p className="text-sm text-destructive">
                {errors.workEmail.message}
              </p>
            )}
          </div>

          {/* Work Phone */}
          <div className="space-y-2">
            <Label htmlFor="workPhone">Work Phone *</Label>
            <Input id="workPhone" type="tel" {...register("workPhone")} />
            {errors.workPhone && (
              <p className="text-sm text-destructive">
                {errors.workPhone.message}
              </p>
            )}
          </div>

          {/* Extension */}
          <div className="space-y-2">
            <Label htmlFor="extension">Extension</Label>
            <Input id="extension" {...register("extension")} />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(v) => setValue("gender", v as any)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Race */}
          <div className="space-y-2">
            <Label htmlFor="race">Race</Label>
            <Select onValueChange={(v) => setValue("race", v as any)}>
              <SelectTrigger id="race">
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "ASIAN",
                  "BLACK",
                  "CAUCASIAN",
                  "HISPANIC",
                  "NATIVE_AMERICAN",
                  "PACIFIC_ISLANDER",
                  "OTHER",
                ].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input id="addressLine1" {...register("addressLine1")} />
              {errors.addressLine1 && (
                <p className="text-sm text-destructive">
                  {errors.addressLine1.message}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input id="addressLine2" {...register("addressLine2")} />
            </div>

            {(["city", "state", "zip", "country"] as const).map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace("zip", "ZIP")}{" "}
                  {field !== "country" && "*"}
                </Label>
                <Input
                  id={field}
                  {...register(field as keyof StaffFormData)}
                  defaultValue={field === "country" ? "USA" : undefined}
                />
                {errors[field] && (
                  <p className="text-sm text-destructive">
                    {(errors[field] as any)?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Contact Name *</Label>
              <Input id="emergencyContact" {...register("emergencyContact")} />
              {errors.emergencyContact && (
                <p className="text-sm text-destructive">
                  {errors.emergencyContact.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                {...register("emergencyContactPhone")}
              />
              {errors.emergencyContactPhone && (
                <p className="text-sm text-destructive">
                  {errors.emergencyContactPhone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactEmail">Contact Email *</Label>
              <Input
                id="emergencyContactEmail"
                type="email"
                {...register("emergencyContactEmail")}
              />
              {errors.emergencyContactEmail && (
                <p className="text-sm text-destructive">
                  {errors.emergencyContactEmail.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume URL</Label>
              <Input
                id="resume"
                {...register("resume")}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
