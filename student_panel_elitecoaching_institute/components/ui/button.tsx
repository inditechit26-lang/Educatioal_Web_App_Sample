import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",
  {
    variants: {
      variant: {
        default: "bg-brand text-white shadow-sm hover:bg-blue-700 hover:shadow-md",
        outline: "border border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50",
        ghost: "text-muted hover:bg-slate-100 hover:text-ink",
        soft: "bg-blue-50 text-brand hover:bg-blue-100",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 px-5",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
