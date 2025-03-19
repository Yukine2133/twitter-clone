"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { SignOutButton } from "@clerk/nextjs";
import {
  ArrowRightStartOnRectangleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { useRef, useState } from "react";

const OpenEllipsisButton = () => {
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(isEllipsisOpen, setIsEllipsisOpen, ref);

  return (
    <div className="relative">
      <button
        onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}
        className="rounded-full p-2 transition-colors hover:bg-white/10"
      >
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </button>
      {isEllipsisOpen && (
        <div
          ref={ref}
          className="absolute bottom-full right-0 mb-2 w-56 rounded-xl bg-black shadow-lg ring-1 ring-white/10"
        >
          <SignOutButton>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-500 transition-colors hover:bg-white/10">
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
};

export default OpenEllipsisButton;
