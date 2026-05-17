import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6efd] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0d6efd] text-white hover:bg-[#0b5ed7]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#0d6efd] hover:text-[#0d6efd]",
        secondary: "bg-[#f1f5f9] text-[#1e293b] hover:bg-[#e2e8f0]",
        ghost: "hover:bg-[#e7f1ff] hover:text-[#0d6efd]",
        link: "text-[#0d6efd] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
