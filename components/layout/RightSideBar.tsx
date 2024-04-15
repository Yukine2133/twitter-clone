"use client";

import { usePathname } from "next/navigation";
import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  const pathname = usePathname();
  if (pathname !== "/search" && pathname !== "/search/tabs/users") {
    return (
      <div className="fixed w-64 top-6 h-screen right-10 hidden xl:block min-[1640px]:right-56 ">
        <SearchInput path="search" />
      </div>
    );
  }
};

export default RightSideBar;
