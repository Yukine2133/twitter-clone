import { LockClosedIcon } from "@heroicons/react/24/outline";
import React from "react";

export const PrivateProfileMessage = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 rounded-full bg-neutral-800 p-5">
        <LockClosedIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">This profile is private</h2>
      <p className="max-w-md text-neutral-500">
        Only users followed by @{username}&apos;s can see posts.
      </p>
    </div>
  );
};
