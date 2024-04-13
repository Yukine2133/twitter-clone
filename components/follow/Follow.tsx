"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface User {
  username: string;
  avatar: string;
  userId: string;
}

interface IFollow {
  following: {
    length: number;
  };
  followers: {
    length: number;
  };
  followersOfTheUser: User[];
}

const Follow = ({ following, followers, followersOfTheUser }: IFollow) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   const handleScroll = (event: WheelEvent) => {
  //     if (isOpen) {
  //       event.preventDefault();
  //     }
  //   };

  //   if (isOpen) {
  //     body?.classList.add("overflow-hidden");
  //     document.addEventListener("wheel", handleScroll, { passive: false });
  //   } else {
  //     body?.classList.remove("overflow-hidden");
  //     document.removeEventListener("wheel", handleScroll);
  //   }

  //   return () => {
  //     document.removeEventListener("wheel", handleScroll);
  //   };
  // }, [isOpen]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const body = document.querySelector("body");

    if (isOpen) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-500 hover:underline decoration-white cursor-pointer"
      >
        {followers.length} Followers
      </button>
      <button className="text-slate-500 hover:underline decoration-white cursor-pointer">
        {following.length} Following
      </button>
      {isOpen && (
        <div
          id="modal"
          className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center"
        >
          <div
            ref={ref}
            className="bg-black shadow-sm w-[500px] max-h-[500px] overflow-y-auto rounded-lg p-6"
          >
            {followersOfTheUser.map((follower) => (
              <div
                key={follower.userId}
                className="flex  gap-2 items-center mb-4"
              >
                <Image
                  src={follower.avatar}
                  alt={follower.username}
                  width={38}
                  height={38}
                  className="rounded-full object-cover"
                />
                <div>
                  <Link href={`/profile/${follower.username}`}>
                    <span className="font-bold ">{follower.username}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Follow;
