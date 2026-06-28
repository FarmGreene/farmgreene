import React from "react";
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export enum SelectVariant {
  FILLED = "filled",
  OUTLINE = "outline",
  GHOST = "ghost",
}
type SelectProps = {
  triggerText: string;
  content: any[];
  containerClass?: string;
  variant: "filled" | "outline" | "ghost";
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: ((value: string) => void) | undefined;
  label?: string;
  optional?: boolean;
  itemClassName?: string;
  position?: "item-aligned" | "popper";
};
const Select = ({
  triggerText,
  content,
  containerClass,
  variant,
  disabled,
  name,
  value,
  onChange,
  label,
  optional,
  itemClassName,
  position,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2 shrink-0">
      {label && (
        <label className="text-accent dark:text-gray-300 3xl:text-[1.1rem]">
          {`${label} ${optional ? "(Optional)" : ""}` || ""}
        </label>
      )}
      <SelectPrimitive
        disabled={disabled ? true : false}
        name={name}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={cn(
            "border bg-transparent text-[#049878] flex items-center gap-1 w-auto focus-within:ring-0 focus:ring-0 focus-visible:ring-0 placeholder:text-gray-300 focus:outline-none h-[40px] py-0 text-sm",
            variant === SelectVariant.FILLED
              ? "border border-gray-400 dark:border-gray-500 bg-gray-25 dark:bg-gray-600 px-6 text-accent rounded-xl gap-3"
              : variant === SelectVariant.OUTLINE
              ? "border border-gray-300 bg-transparent px-3 text-accent-foreground rounded-lg gap-3 hover:bg-transparent h-[40px]"
              : "bg-transparent gap-3 hover:bg-transparent",
            containerClass
          )}
        >
          {content.filter((item) => item.value === value)[0]?.label ??
            triggerText}
        </SelectTrigger>
        <SelectContent className=" border-none" position={position}>
          {content.map((item, idx) => (
            <SelectItem
              key={`select-item-${idx}-${item.label}`}
              value={item.value}
              className={cn(
                "dark:text-gray-300 focus:bg-gray-50 hover:text-accent dark:hover:text-gray-300 focus:text-foreground cursor-pointer gap-1 py-2",
                itemClassName
              )}
            >
              <div className="flex items-center gap-1">
                {item.icon && <p>{item.icon}</p>}
                <p>{item.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>
    </div>
  );
};

export default Select;
