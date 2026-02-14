"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreVertical,
  Mail,
  UserPlus,
  Filter,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data
const MEMBERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@farmgreene.com",
    role: "Owner",
    status: "Active",
    lastActive: "Now",
    avatar: "JD",
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah@farmgreene.com",
    role: "Admin",
    status: "Active",
    lastActive: "14 mins ago",
    avatar: "SM",
  },
  {
    id: "3",
    name: "Ahmed Musa",
    email: "ahmed.m@farmgreene.com",
    role: "Analyst",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "AM",
  },
  {
    id: "4",
    name: "Kelechi Okafor",
    email: "k.okafor@agents.com",
    role: "Field Agent",
    status: "Active",
    lastActive: "5 hours ago",
    avatar: "KO",
  },
  {
    id: "5",
    name: "Blessing Udoh",
    email: "blessing.u@farmgreene.com",
    role: "Viewer",
    status: "Invited",
    lastActive: "Yesterday",
    avatar: "BU",
  },
  {
    id: "6",
    name: "David Chen",
    email: "david.c@farmgreene.com",
    role: "Analyst",
    status: "Active",
    lastActive: "3 days ago",
    avatar: "DC",
  },
  {
    id: "7",
    name: "Grace Peterson",
    email: "grace@farmgreene.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 days ago",
    avatar: "GP",
  },
];

const ROLE_COLORS: Record<string, string> = {
  Owner:
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800",
  Admin:
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  Analyst:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
  "Field Agent":
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800",
  Viewer:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

export default function WorkspaceMembers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filteredMembers = MEMBERS.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "All Roles" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 shadow-sm">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-500" />
                <SelectValue placeholder="All Roles" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Roles">All Roles</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Analyst">Analyst</SelectItem>
              <SelectItem value="Field Agent">Field Agent</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-10 w-full sm:w-auto">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
            <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
              <TableHead className="pl-6 w-[35%] py-4">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow
                key={member.id}
                className="group border-slate-100 dark:border-slate-900"
              >
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-400 overflow-hidden shadow-sm">
                      {member.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white leading-none mb-1">
                        {member.name}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${ROLE_COLORS[member.role]} font-medium py-0.5 border-opacity-50`}
                  >
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    {member.status === "Active" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-slate-700 dark:text-slate-300">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600">Invited</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-500 flex items-center gap-1.5 h-full pt-6">
                  <Clock className="h-3.5 w-3.5" />
                  {member.lastActive}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span>
          Showing {filteredMembers.length} of {MEMBERS.length} members
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-slate-200"
            disabled
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-slate-200"
            disabled
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
