"use client";

import { useRef, useState } from "react";
import MoreButtonEllipsis from "./MoreButtonEllipsis";
import MoreButtonDropdown from "./MoreButtonDropdown";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutisde";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

export const MoreButtonProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useMoreButtonClickOutside(buttonRef, setIsOpen);
  return (
    <div className="relative inline-block">
      <MoreButtonEllipsis
        className="relative lg:opacity-100 p-2 border border-neutral-700 rounded-full hover:bg-neutral-900 transition-colors hover:text-white"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <MoreButtonDropdown className="top-2" isOpen={isOpen}>
          <div className="py-1">
            <button
              onClick={() => {
                // setEdit(!edit);
                // setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10 text-red-500"
            >
              <NoSymbolIcon className="size-5 " />
              <span>Ban</span>
            </button>
          </div>
        </MoreButtonDropdown>
      )}
    </div>
  );
};
