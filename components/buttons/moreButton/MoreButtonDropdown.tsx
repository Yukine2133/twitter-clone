"use client";
import { ReactNode } from "react";

interface MoreDropdownProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const MoreButtonDropdown = ({
  isOpen,
  children,
  className,
}: MoreDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-10 min-w-[180px] rounded-xl bg-black shadow-lg ring-1 ring-white/10 right-0 top-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default MoreButtonDropdown;
