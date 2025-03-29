import { getUserBookmarkFolders } from "@/actions/bookmark.actions";
import { BookmarkIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import AddOrEditBookmarkFolderButton from "@/components/buttons/AddOrEditBookmarkFolderButton";
import BookmarkFolderItem from "@/components/bookmarks/BookmarkFolderItem";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

export const metadata = {
  title: "Bookmarks",
  description: "Tweeter Bookmarks page",
};

const Bookmarks = async () => {
  const { currentDbUser } = await useGetCurrentUser();
  const userBookmarkFolders = await getUserBookmarkFolders(
    currentDbUser.userId as string
  );
  return (
    <div>
      <div className="flex items-center justify-between px-2 md:px-4 pt-2">
        <div className="">
          <h2 className="font-semibold text-xl">Bookmarks</h2>
          <span className="text-gray-500 text-sm mt-1">
            @{currentDbUser?.username}
          </span>
        </div>
        <AddOrEditBookmarkFolderButton />
      </div>

      <div className="mt-4">
        <Link
          href="/bookmarks/all"
          className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 rounded-full p-[10px] relative">
              <BookmarkIcon className="size-6 z-10" />
              <BookmarkIcon className="size-6 absolute top-[7px] right-1.5" />
            </div>
            <p>All Bookmarks</p>
          </div>
          <ChevronRightIcon className="size-5" />
        </Link>

        {userBookmarkFolders?.map((folder, index) => (
          <BookmarkFolderItem key={folder._id} folder={folder} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
