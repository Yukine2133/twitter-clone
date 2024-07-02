import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const Bookmarks = () => {
  return (
    <div>
      <div className="px-2 md:px-4 pt-2">
        <h2 className="font-semibold text-xl ">Bookmarks</h2>
        <span className="text-gray-500 text-sm mt-1 ">@username</span>
      </div>

      <div className="mt-4">
        <Link
          href="/bookmarks/all"
          className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full "
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 rounded-full p-[10px] relative ">
              <BookmarkIcon className="size-6 z-10" />
              <BookmarkIcon className="size-6 absolute top-[7px] right-1.5" />
            </div>
            <p>All Bookmarks</p>
          </div>
          <ChevronRightIcon className="size-5" />
        </Link>

        <Link
          href="/bookmarks/:nameOfTheFolder"
          className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full "
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 rounded-full p-[10px] ">
              <BookmarkIcon className="size-6 z-10" />
            </div>
            <p>User custom folder</p>
          </div>
          <ChevronRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  );
};

export default Bookmarks;
