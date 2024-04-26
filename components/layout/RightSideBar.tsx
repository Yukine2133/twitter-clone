"use client";

import { usePathname } from "next/navigation";
import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  const pathname = usePathname();
  if (pathname !== "/search" && pathname !== "/search/tabs/users") {
    return (
      <div className="pl-3 mt-10 max-[900px]:hidden ">
        <SearchInput path="search" />
      </div>
    );
  }
};

export default RightSideBar;
