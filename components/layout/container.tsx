import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  /** Full-bleed width (1440px), for sections that want to run wider than body copy. Default is the 1200px content width. */
  full?: boolean;
}

export function Container({ full = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        full ? "max-w-[1440px]" : "max-w-[1200px]",
        className
      )}
      {...props}
    />
  );
}
