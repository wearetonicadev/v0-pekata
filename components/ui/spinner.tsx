import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  text?: string;
};

export const Spinner = ({ className, text = "Cargando..." }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      <div className="text-center ">
        <div className="animate-spin rounded-full size-8 border-b-2 border-black mx-auto mb-5" />
        <p className="text-sm font-bold">{text}</p>
      </div>
    </div>
  );
};
