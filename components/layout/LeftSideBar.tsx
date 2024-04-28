"use client";

import { sidebarLinks } from "@/utils/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TweetForm from "../tweets/TweetForm";
import Modal from "../tweets/Modal";
import { IUser } from "@/types/user.interface";

const LeftSideBar = ({ currentUser }: { currentUser: IUser }) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
            className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80  font-semibold"
          >
            Tweet
          </button>
        </div>
        <div className="flex flex-col lg:flex-row pl-5 lg:gap-3  lg:items-center fixed bottom-3">
          {currentUser ? (
            <Image
              src={currentUser?.avatar!}
              alt={currentUser?.username!}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="animate-pulse bg-slate-600 h-12 w-12 rounded-full "></div>
          )}
          <LogoutLink className="lg:hidden">Logout</LogoutLink>

          <div className=" flex-col hidden lg:flex ">
            {/* <h2>{currentUser ? currentUser.username}</h2> */}
            {currentUser ? (
              <h2>{currentUser.username}</h2>
            ) : (
              <h2 className="animate-pulse h-4 rounded-full w-16 bg-slate-600"></h2>
            )}
            <LogoutLink>Logout</LogoutLink>
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
