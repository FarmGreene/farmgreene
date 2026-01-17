"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarSwitcher } from "@/components/layout/SidebarSwitcher";

export function DashboardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  // Generate breadcrumbs from path segments
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{title}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-6 md:px-8 backdrop-blur supports-backdrop-filter:bg-background/60 justify-between">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden -ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[240px] [&>button]:hidden">
            <SidebarSwitcher className="flex w-full h-full border-r-0" />
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.length > 0 ? (
                breadcrumbItems
              ) : (
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search market data, reports..."
            className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
        <Button
          size="sm"
          className="gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Become an agent
        </Button>
      </div>
    </header>
  );
}
