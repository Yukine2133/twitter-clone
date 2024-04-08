import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { TweetProps } from "./TweetCard";
import ReplyForm from "./ReplyForm";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

interface IReplyModal extends TweetProps {
  toggleModal: (arg0: boolean) => void;
  id: string;
  user: KindeUser;
}

const ReplyModal = ({ toggleModal, id, tweet, owner, user }: IReplyModal) => {
  const ref = useRef<HTMLDivElement>(null);

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
      <div ref={ref} className="bg-black shadow-sm w-[700px] rounded-lg p-8">
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
