"use client";
import { cn } from "@/utils/cn";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface MoreButtonEllipsisProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MoreButtonEllipsis = forwardRef<
  HTMLButtonElement,
  MoreButtonEllipsisProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        `relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500 lg:opacity-0 group-hover:opacity-100 `,
        className
      )}
      {...props}
    >
      <EllipsisHorizontalIcon className="h-5 w-5" />
    </button>
  );
});

MoreButtonEllipsis.displayName = "MoreButtonEllipsis";
export default MoreButtonEllipsis;
