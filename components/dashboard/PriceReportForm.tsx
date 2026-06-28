"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const priceSchema = z.object({
  market: z.string().min(1, "Please select a market."),
  commodity: z.string().min(1, "Please select a commodity."),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
});

export function PriceReportForm() {
  // using mock toast logic since we might not have the hook installed or setup yet.
  // Actually, shadcn init usually installs it but let's check.
  // If not, we'll just alert or console log.
  // For safety, let's assume no toast hook yet and use simple state or alert.
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof priceSchema>>({
    resolver: zodResolver(priceSchema),
  });

  function onSubmit(values: z.infer<typeof priceSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 3000); // clear success msg
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="market"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="osogbo">Osogbo Main Market</SelectItem>
                  <SelectItem value="ilesa">Ilesa Market</SelectItem>
                  <SelectItem value="bodija">Bodija Market (Ibadan)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="commodity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commodity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commodity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cocoa">Cocoa</SelectItem>
                  <SelectItem value="palm_oil">Palm Oil</SelectItem>
                  <SelectItem value="cassava">Cassava</SelectItem>
                  <SelectItem value="yam">Yam</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₦)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
        {success && (
          <p className="text-sm text-[#049878] text-center font-medium">
            Report submitted successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
