"use client";

import { useState } from "react";
import { Menu, X, Home, Hash, Bell, Mail } from "lucide-react";
import { SidebarLinkCard } from "../LeftSiderBar/SidebarLinkCard";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

const BottomBarUI = ({ currentDbUser }: { currentDbUser: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-20 min-[800px]:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile navigation drawer */}
      <div
        className={`fixed  bottom-16 left-0 z-30 w-full bg-[#111] border border-neutral-800 rounded-t-xl transform transition-transform duration-300 ease-in-out min-[800px]:hidden ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <div className="flex items-center justify-between mb-2">
            {currentDbUser && (
              <div className="overflow-hidden flex justify-between items-center last:justify-end gap-6 rounded-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={currentDbUser.avatar}
                    alt={currentDbUser.username}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                  <h2>{currentDbUser.username}</h2>
                </div>

                <SignOutButton>
                  <button className="flex items-center gap-3  text-left text-red-500 transition-colors hover:bg-white/10">
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </SignOutButton>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-neutral-800"
            >
              <Bars3BottomLeftIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <SidebarLinkCard
              userId={currentDbUser.userId}
              username={currentDbUser?.username}
              isMobile
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomBarUI;
