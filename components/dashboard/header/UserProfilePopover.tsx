"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/useAuthStore";
import {
  getFullName,
  getInitials,
  getRoleLabel,
} from "@/lib/utils/user-display";

export function UserProfilePopover() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const { mutateAsync: logout } = useLogout();
  const currentUser = useAuthStore((state) => state.user);

  const fullName = getFullName(currentUser);
  const email = currentUser?.email ?? "";
  const initials = getInitials(currentUser);
  const roleLabel = getRoleLabel(currentUser);
  const avatarUrl = currentUser?.avatarUrl ?? undefined;

  const handleLogout = async () => {
    // Implement logout logic here
    console.log("Logging out...");
    await logout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <DropdownMenu open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-green-100 transition-all"
          >
            <Avatar className="h-9 w-9">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={fullName} />
              ) : null}
              <AvatarFallback className="bg-green-700 text-white font-medium text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0" align="end" forceMount>
          <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
            <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={fullName} />
              ) : null}
              <AvatarFallback className="bg-green-700 text-white font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">
                {fullName}
              </p>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[140px]">
                {email}
              </p>
              {roleLabel && (
                <p className="text-[10px] text-[#049878] font-bold uppercase tracking-wider pt-1">
                  {roleLabel}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator className="m-0" />
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/settings"
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Profile</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/settings/preferences"
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Preferences</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/workspace/billing"
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Billing</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/workspace"
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Workspace</span>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="m-0" />
          <div className="p-1">
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10 cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                setIsPopoverOpen(false);
                setShowLogoutDialog(true);
              }}
            >
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span>Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log out of Farmgreene?</DialogTitle>
            <DialogDescription>
              You will need to log in again to access your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
