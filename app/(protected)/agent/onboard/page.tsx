"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { QuickAddEquipmentForm } from "@/components/dashboard/agent/QuickAddEquipmentForm";

export default function OnboardEquipmentPage() {
  return (
    <div className="flex-1 max-w-2xl mx-auto w-full pb-12 pt-4 px-0 md:px-4 space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">Onboard Equipment</h2>
        <p className="text-muted-foreground text-sm mt-1">
          List equipment on behalf of an owner you&apos;ve recruited in the field.
        </p>
      </motion.div>

      <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
        <div className="h-1 bg-linear-to-r from-primary to-primary/30" />
        <CardContent className="px-5 py-6 sm:px-6">
          <QuickAddEquipmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
