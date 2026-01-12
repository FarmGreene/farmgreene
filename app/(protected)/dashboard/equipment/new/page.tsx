import { EquipmentListingForm } from "@/components/dashboard/EquipmentListingForm";
import { Separator } from "@/components/ui/separator";

export default function AddEquipmentPage() {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          List New Equipment
        </h2>
        <p className="text-muted-foreground">
          Fill in the details below to make your machinery available for rent.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <EquipmentListingForm />
        </div>
      </div>
    </div>
  );
}
