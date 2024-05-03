"use client";

import { sidebarLinks } from "@/utils/constants";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TweetForm from "../tweets/TweetForm";
import Modal from "../tweets/Modal";
import { IUser } from "@/types/user.interface";
import {
  ArrowRightStartOnRectangleIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import useClickOutside from "@/utils/lib/hooks/useClickOutisde";
import { fetchUser } from "@/actions/user.actions";

const LeftSideBar = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useClickOutside(isEllipsisOpen, setIsEllipsisOpen, ref);

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetchUser(user?.id);
      setCurrentUser(JSON.parse(JSON.stringify(res)));
    };
    fetchCurrentUser();
  }, [user?.id]);

  return (
    <>
      <div className="mt-10  max-[799px]:hidden max-[799px]:mt-0    ">
        <div className="flex w-full flex-col space-y-4  gap-6 px-6">
          {sidebarLinks.map((link) => {
            let { Icon, SolidIcon, disabled, route } = link;
            const isActive =
              (pathname.includes(route) && route.length > 1) ||
              pathname === route;
            if (link.route === "/profile" && currentUser?.username)
              link.route = `${link.route}/${currentUser.username}`;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`flex items-center text-xl gap-3 ${
                  disabled && "cursor-not-allowed"
                } ${isActive && "font-bold"}`}
              >
                {isActive ? (
                  <SolidIcon className="h-7 w-7" />
                ) : (
                  <Icon className="h-7 w-7" />
                )}
                {/* <SolidIcon /> */}
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
          <button
            onClick={toggleModal}
            className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80 hidden lg:block  font-semibold"
          >
            Tweet
          </button>
          <button
            onClick={toggleModal}
            className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80 lg:hidden   "
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row  px-3 transition-colors duration-150 py-1 lg:gap-3 hover:bg-[#1c1c1c] rounded-full lg:items-center fixed bottom-3">
          <Image
            src={currentUser?.avatar!}
            alt={currentUser?.username!}
            width={48}
            height={48}
            className="rounded-full"
            onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}
          />
          {isEllipsisOpen && (
            <div
              ref={ref}
              className="absolute -top-14 lg:hidden -right-4 flex gap-2 bg-black shadow-sm p-3 shadow-white "
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <LogoutLink>Logout</LogoutLink>
            </div>
          )}

          <div className="items-center gap-2 relative  hidden lg:flex ">
            <div>
              <h2 className="font-semibold truncate w-[125px]">
                {currentUser?.displayName}
              </h2>
              <h2 className="text-gray-500">@{currentUser?.username}</h2>
            </div>
            <button onClick={() => setIsEllipsisOpen(!isEllipsisOpen)}>
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
            {isEllipsisOpen && (
              <div
                ref={ref}
                className="absolute -top-14 right-10 flex gap-2 bg-black shadow-sm p-3 shadow-white "
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                <LogoutLink>Logout</LogoutLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <TweetForm user={currentUser!} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default LeftSideBar;
