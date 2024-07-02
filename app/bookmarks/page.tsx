import { getUserBookmarkFolders } from "@/actions/bookmark.actions";
import AddBookmarkFolderButton from "@/components/buttons/AddBookmarkFolderButton";
import { BookmarkIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchUser } from "@/actions/user.actions";

export const colors = [
  "bg-purple-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-indigo-500",
];

const Bookmarks = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let currentUser;
  if (user) {
    currentUser = await fetchUser(user.id);
  }
  const userBookmarkFolders = await getUserBookmarkFolders(user?.id as string);
  return (
    <div>
      <div className="flex items-center justify-between px-2 md:px-4 pt-2">
        <div className="">
          <h2 className="font-semibold text-xl">Bookmarks</h2>
          <span className="text-gray-500 text-sm mt-1">
            @{currentUser?.username}
          </span>
        </div>
        <AddBookmarkFolderButton />
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

        {userBookmarkFolders?.map((folder, index) => {
          const folderNameWithHyphens = folder.name.replace(/\s+/g, "-");
          const colorClass = colors[index % colors.length]; // Pick color based on index
          return (
            <Link
              key={folder._id}
              href={`/bookmarks/${folderNameWithHyphens}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
            >
              <div className="flex items-center gap-4">
                <div className={`${colorClass} rounded-full p-[10px]`}>
                  <BookmarkIcon className="size-6 z-10" />
                </div>
                <p>{folder.name}</p>
              </div>
              <ChevronRightIcon className="size-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
