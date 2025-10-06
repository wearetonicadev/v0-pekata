"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  noOptionsMessage?: string;
  allowClear?: boolean;
  multiple?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  disabled = false,
  triggerClassName,
  contentClassName,
  allowClear = false,
  multiple = false,
  selectedValues = [],
  onSelectedValuesChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSelect = (selectedValue: string) => {
    if (multiple && onSelectedValuesChange) {
      const newValues = selectedValues.includes(selectedValue)
        ? selectedValues.filter((v) => v !== selectedValue)
        : [...selectedValues, selectedValue];
      onSelectedValuesChange(newValues);
    } else if (onValueChange) {
      const newValue = value === selectedValue ? "" : selectedValue;
      onValueChange(newValue);
      setOpen(false);
    }
  };

  const handleClear = () => {
    if (multiple && onSelectedValuesChange) {
      onSelectedValuesChange([]);
    } else if (onValueChange) {
      onValueChange("");
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find((opt) => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length} selected`;
    } else {
      if (!value) return placeholder;
      const option = options.find((opt) => opt.value === value);
      return option?.label || placeholder;
    }
  };

  const filteredOptions = (options || []).filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isOptionSelected = (optionValue: string) => {
    if (multiple) {
      return selectedValues.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", triggerClassName)}
        >
          <span className="truncate">{getDisplayValue()}</span>
          <div className="flex items-center gap-1">
            {allowClear &&
              ((multiple && selectedValues.length > 0) ||
                (!multiple && value)) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn("h-4 w-4 p-0 hover:bg-transparent")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  ×
                </Button>
              )}
            <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", contentClassName)}>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "cursor-pointer",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        isOptionSelected(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
