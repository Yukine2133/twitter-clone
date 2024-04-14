import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import ReplyForm from "./ReplyForm";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { ITweetProps } from "@/types/tweet.interface";

interface IReplyModal extends ITweetProps {
  toggleModal: (arg0: boolean) => void;
  id: string;
  user: KindeUser;
  isModalOpen: boolean;
}

const ReplyModal = ({
  toggleModal,
  id,
  tweet,
  owner,
  user,
  isModalOpen,
}: IReplyModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", handleScroll);
    }

    // Cleanup function to remove overflow class when unmounting or modal is closed
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow style
      document.removeEventListener("wheel", handleScroll);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <div className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
      <div
        ref={ref}
        className="bg-black shadow-sm w-[700px] rounded-lg mx-2 md:mx-0 p-5 md:p-8"
      >
        <div className="flex  gap-2 items-start">
          <Image
            src={owner.avatar}
            alt={owner.username}
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
          <div>
            <Link href={`/profile/${owner.username}`}>
              <span className="font-bold ">{owner.username}</span>
            </Link>
            <h3 style={{ overflowWrap: "anywhere" }}>{tweet.text}</h3>
          </div>
        </div>
        <h4 className="mt-7 mb-6 ">
          Replying to <span className="font-bold ">{owner.username}</span>
        </h4>
        <ReplyForm user={user!} id={id} toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default ReplyModal;
