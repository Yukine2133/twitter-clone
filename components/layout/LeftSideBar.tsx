"use client";

import { sidebarLinks } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TweetForm from "../tweets/tweetForm/TweetForm";
import Modal from "../tweets/Modal";
import { PencilIcon } from "@heroicons/react/24/outline";
import useFetchCurrentUser from "@/utils/lib/hooks/useFetchCurrentUser";

const LeftSideBar = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentUser = useFetchCurrentUser();

  return (
    <>
      <div className="mt-10 fixed -translate-x-8 lg:-translate-x-4  max-[799px]:hidden max-[799px]:mt-0    ">
        <div className="flex w-full flex-col space-y-4  gap-6 px-6">
          {sidebarLinks.map((link) => {
            let { Icon, SolidIcon, route } = link;
            const isActive =
              (pathname.includes(route) && route.length > 1) ||
              pathname === route;
            if (link.route === "/profile" && currentUser?.username)
              link.route = `${link.route}/${currentUser.username}`;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`flex items-center text-xl gap-3  ${
                  isActive && "font-bold"
                }`}
              >
                {isActive ? (
                  <SolidIcon className="h-7 w-7" />
                ) : (
                  <Icon className="h-7 w-7" />
                )}

                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
          <button
            onClick={toggleModal}
            className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80  hidden lg:block  font-semibold"
          >
            Tweet
          </button>
          <button
            onClick={toggleModal}
            className="bg-blue-500 rounded-full px-3 py-3 hover:opacity-80 lg:hidden -translate-x-[7px]   "
          >
            <PencilIcon className="h-5 w-5" />
          </button>
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
