"use client";

import { usePathname } from "next/navigation";
import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  const pathname = usePathname();
  if (pathname != "/search") {
    return (
      <div className="fixed w-64 top-6 h-screen right-56 ">
        <SearchInput />
      </div>
    );
  }
};

export default RightSideBar;
