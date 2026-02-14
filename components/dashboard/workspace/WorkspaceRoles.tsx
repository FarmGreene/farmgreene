"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ROLES = ["Owner", "Admin", "Analyst", "Agent", "Viewer"];

const PERMISSIONS = [
  {
    feature: "View Intelligence Hub",
    owner: true,
    admin: true,
    analyst: true,
    agent: "Limited",
    viewer: true,
  },
  {
    feature: "Access Marketplace",
    owner: true,
    admin: true,
    analyst: true,
    agent: true,
    viewer: true,
  },
  {
    feature: "Generate AI Reports",
    owner: true,
    admin: true,
    analyst: true,
    agent: false,
    viewer: false,
  },
  {
    feature: "Submit Market Prices",
    owner: true,
    admin: true,
    analyst: false,
    agent: true,
    viewer: false,
  },
  {
    feature: "Manage Workspace Members",
    owner: true,
    admin: true,
    analyst: false,
    agent: false,
    viewer: false,
  },
  {
    feature: "Billing & Subscriptions",
    owner: true,
    admin: false,
    analyst: false,
    agent: false,
    viewer: false,
  },
  {
    feature: "Configure Workspace Settings",
    owner: true,
    admin: true,
    analyst: false,
    agent: false,
    viewer: false,
  },
];

export default function WorkspaceRoles() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          Role Dependencies
        </h3>
        <p className="text-sm text-slate-500">
          Overview of system-wide permissions assigned to each role tier.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <TooltipProvider>
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
              <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                <TableHead className="pl-6 w-[30%] py-4 font-semibold uppercase text-xs tracking-wider text-slate-500">
                  Feature Access
                </TableHead>
                {ROLES.map((role) => (
                  <TableHead
                    key={role}
                    className="text-center font-semibold uppercase text-xs tracking-wider text-slate-500"
                  >
                    {role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERMISSIONS.map((perm, idx) => (
                <TableRow
                  key={idx}
                  className="border-slate-100 dark:border-slate-900 group"
                >
                  <TableCell className="pl-6 py-4 font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      {perm.feature}
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Detailed level of access for {perm.feature}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <PermissionCell value={perm.owner} />
                  <PermissionCell value={perm.admin} />
                  <PermissionCell value={perm.analyst} />
                  <PermissionCell value={perm.agent} />
                  <PermissionCell value={perm.viewer} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>

      <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg flex gap-3 items-start">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-tight">
            Need custom roles?
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed max-w-2xl">
            The Pro plan includes standard role templates. Enterprise customers
            can define granular custom roles and feature-level policies. Contact
            our sales team for more information.
          </p>
        </div>
      </div>
    </div>
  );
}

function PermissionCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <TableCell className="text-center">
        <div className="flex justify-center">
          <Check className="h-4 w-4 text-emerald-500 stroke-[3px]" />
        </div>
      </TableCell>
    );
  }
  if (value === false) {
    return (
      <TableCell className="text-center">
        <div className="flex justify-center text-slate-300 dark:text-slate-700">
          <X className="h-4 w-4 stroke-[1.5px]" />
        </div>
      </TableCell>
    );
  }
  return (
    <TableCell className="text-center">
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className="text-[10px] font-bold px-1.5 py-0 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
        >
          {value}
        </Badge>
      </div>
    </TableCell>
  );
}
