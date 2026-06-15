"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1Data } from "../createListingSchema";
import { CategorySelector, getSubcategories } from "../shared/CategorySelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EquipmentCategory } from "@/types/marketplace";

interface Step1BasicsProps {
  onSubmit: (data: Step1Data) => Promise<void>;
  defaultValues?: Partial<Step1Data>;
  isLoading: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1989 },
  (_, i) => currentYear - i,
);

export function Step1Basics({
  onSubmit,
  defaultValues,
  isLoading,
}: Step1BasicsProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  const selectedCategory = watch("category") as EquipmentCategory | undefined;
  const subcategories = selectedCategory
    ? getSubcategories(selectedCategory)
    : [];

  return (
    <form
      id="step-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Equipment Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Equipment Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder='e.g. "John Deere 5050D Tractor"'
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>
          Category <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CategorySelector
              value={field.value}
              onChange={(cat) => {
                field.onChange(cat);
                setValue("subcategory", ""); // reset subcategory on category change
              }}
            />
          )}
        />
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Subcategory */}
      {subcategories.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="subcategory">
            Subcategory <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="subcategory"
            control={control}
            render={({ field }) => (
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <SelectTrigger id="subcategory" className="w-full">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subcategory && (
            <p className="text-xs text-red-500">{errors.subcategory.message}</p>
          )}
        </div>
      )}

      {/* Brand & Model */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">
            Brand <span className="text-red-500">*</span>
          </Label>
          <Input
            id="brand"
            placeholder="e.g. John Deere"
            {...register("brand")}
          />
          {errors.brand && (
            <p className="text-xs text-red-500">{errors.brand.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">
            Model{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input id="model" placeholder="e.g. 5050D" {...register("model")} />
        </div>
      </div>

      {/* Year */}
      <div className="space-y-2">
        <Label>
          Year Manufactured <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="yearManufactured"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(v) => field.onChange(parseInt(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.yearManufactured && (
          <p className="text-xs text-red-500">
            {errors.yearManufactured.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>{" "}
          <span className="text-xs text-muted-foreground">
            (min. 50 characters)
          </span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe your equipment — its condition, what it can do, and why renters should choose it..."
          rows={4}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
    </form>
  );
}
