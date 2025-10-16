import { useState, useRef, useLayoutEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearch } from "../../contexts/SearchContext";


export function EmployeesSearchBar({
  disabled,
  contentClassName,
}: {
  disabled?: boolean;
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const { search, setSearch } = useSearch();


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };


  // Measure trigger width
  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);

    }
  }, [triggerRef.current]);

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val) setTimeout(() => inputRef.current?.focus(), 0);
      }}
    >
      <PopoverTrigger asChild>
        <div className="relative w-full" ref={triggerRef}>
          <Input
            ref={inputRef}
            type="text"
            disabled={disabled}
            placeholder="Buscar empleados..."
            autoComplete="no"
            value={search}
            onChange={handleSearchChange}
            className={cn(
              "w-full rounded-full pr-10 p-4 placeholder:text-[#1F503B] border border-[#D9E2EE]",
              disabled && "bg-muted cursor-not-allowed"
            )}
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F503B]" />
        </div>
      </PopoverTrigger>

      {/* Optional overlay */}
      {open && (
        <div
          className={cn("fixed left-0 right-0 bottom-0 bg-black opacity-20 z-1 top-[112px]")}
          onClick={() => setOpen(false)}
        />
      )}

      <PopoverContent
        side="bottom"
        align="start"
        style={{ width: triggerWidth }}
        className={cn("p-2 text-sm", contentClassName)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div>hello</div>
        <div className="text-xs text-muted mt-2">
        </div>
      </PopoverContent>
    </Popover>
  );
}
