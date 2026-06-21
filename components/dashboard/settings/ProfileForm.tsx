"use client";

import { useRef, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Mail, MapPin, Briefcase, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useCurrentUser, useUpdateProfile } from "@/lib/hooks/useAuth";
import { getInitials, getRoleLabel } from "@/lib/utils/user-display";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  location: z.string().max(160).optional(),
  // Transient: a base64 data URL staged on the form until the user saves.
  avatar: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  // Ensures the user is hydrated from the token if not already in the store.
  const { isLoading } = useCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    // Reactively re-syncs the form whenever the user hydrates/updates.
    // `avatar` stays empty — it's only set when the user picks a new photo.
    values: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: user?.phone ?? "",
      location: user?.location ?? "",
      avatar: "",
    },
  });

  // Locally-staged new photo (base64), shown immediately; falls back to the
  // saved avatar. Uploaded to Cloudinary only when "Save Changes" is clicked.
  const stagedAvatar = watch("avatar");
  const previewSrc = stagedAvatar || user?.avatarUrl || undefined;

  function onSubmit(values: ProfileValues) {
    updateProfile({
      firstName: values.firstName.trim(),
      lastName: values.lastName?.trim() ?? "",
      phone: values.phone?.trim() ?? "",
      location: values.location?.trim() ?? "",
      avatar: values.avatar ? values.avatar : undefined,
    });
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be 2MB or smaller.");
      return;
    }
    // Read as base64 and stage it on the form; nothing is uploaded yet.
    const reader = new FileReader();
    reader.onload = () =>
      setValue("avatar", reader.result as string, { shouldDirty: true });
    reader.onerror = () => toast.error("Could not read that image.");
    reader.readAsDataURL(file);
  }

  const roleLabel = getRoleLabel(user) || "—";
  const initials = getInitials(user);

  if (!user && isLoading) {
    return (
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              aria-label="Change profile photo"
              className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:cursor-not-allowed"
            >
              <Avatar className="h-24 w-24 border-2 border-slate-100 dark:border-slate-800">
                {previewSrc ? (
                  <AvatarImage src={previewSrc} alt="Profile photo" />
                ) : null}
                <AvatarFallback className="text-xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {isPending ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </span>
            </button>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <h3 className="font-medium text-slate-900 dark:text-white">
                Profile Photo
              </h3>
              <p className="text-sm text-slate-500 max-w-[240px]">
                Supports JPG, PNG or GIF. Max size of 2MB.
              </p>
              {stagedAvatar && (
                <p className="text-xs font-medium text-emerald-600">
                  New photo selected — click Save Changes to apply.
                </p>
              )}
              <div className="flex justify-center sm:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                >
                  Choose Photo
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-9"
                    disabled={isPending}
                    {...register("firstName")}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="pl-9"
                    disabled={isPending}
                    {...register("lastName")}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    value={user?.email ?? ""}
                    readOnly
                    disabled
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Email can&apos;t be changed here.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    id="role"
                    className="pl-9"
                    value={roleLabel}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    value={field.value ?? ""}
                    onChange={(v) => field.onChange(v ?? "")}
                    onBlur={field.onBlur}
                    disabled={isPending}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  placeholder="e.g. Lagos, Nigeria"
                  className="pl-9"
                  disabled={isPending}
                  {...register("location")}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 min-w-[120px]"
                disabled={isPending || !isDirty}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
