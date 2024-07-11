"use client";

import useClickOutside from "@/utils/lib/hooks/useClickOutisde";
import {
  ArrowRightStartOnRectangleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useRef, useState } from "react";

const OpenEllipsisButton = () => {
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(isEllipsisOpen, setIsEllipsisOpen, ref);

  return (
    <>
      <button onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}>
        <EllipsisHorizontalIcon className="h-5 w-5 translate-x-2 lg:-translate-x-6 xl:-translate-x-0" />
      </button>
      {isEllipsisOpen && (
        <div
          ref={ref}
          className="absolute -top-14 -right-10 lg:right-10 flex gap-2 bg-black shadow-sm p-3 shadow-white "
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          <LogoutLink>Logout</LogoutLink>
        </div>
      )}
    </>
  );
};

export default OpenEllipsisButton;
