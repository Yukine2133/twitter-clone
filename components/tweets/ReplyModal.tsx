"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";
import TweetForm from "./tweetForm/TweetForm";
import type { IUser } from "@/interfaces/user.interface";
import { VerifiedBadge } from "../premium/VerifiedBadge";

interface IReplyModalProps {
  id: string;
  toggleModal: () => void;
  isModalOpen: boolean;
  owner: IUser;
  tweetText: string;
  user: IUser;
  tweetImages: string[];
  tweetVideos: string[];
}

export const ReplyModal = ({
  id,
  toggleModal,
  isModalOpen,
  owner,
  tweetText,
  user,
  tweetImages,
  tweetVideos,
}: IReplyModalProps) => {
  return (
    <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
      <div className="relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 z-10 flex items-center bg-black/80 px-4 py-2 backdrop-blur-sm">
          <button
            onClick={toggleModal}
            className="rounded-full p-1 hover:bg-white/10"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Image
                src={owner.avatar || "/placeholder.svg"}
                alt={owner.username}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="flex-grow w-0.5 bg-neutral-800 mt-2" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <Link
                  href={`/profile/${owner.username}`}
                  className="font-bold hover:underline"
                >
                  {owner.displayName || owner.username}
                </Link>
                {owner.isSubscribed && (
                  <VerifiedBadge isSubscribed={owner.isSubscribed} />
                )}
              </div>
              <p className="text-neutral-500">@{owner.username}</p>
              <p className="whitespace-pre-wrap break-words text-[15px] text-neutral-100 mt-2">
                {tweetText}
              </p>
              {tweetImages && tweetImages.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {tweetImages.map((imageUrl) => (
                    <div key={imageUrl} className="overflow-hidden rounded-2xl">
                      <Image
                        className="w-full object-cover"
                        src={imageUrl || "/placeholder.svg"}
                        alt="Tweet image"
                        width={500}
                        height={300}
                      />
                    </div>
                  ))}
                </div>
              )}
              {tweetVideos && tweetVideos.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {tweetVideos.map((videoUrl) => (
                    <div key={videoUrl} className=" mt-4 ">
                      <video
                        className="rounded-lg w-fit mt-1"
                        controls
                        src={videoUrl}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex">
            <div>
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-2 ml-3 text-sm text-neutral-500">
                Replying to{" "}
                <Link
                  href={`/profile/${owner.username}`}
                  className="text-blue-500 hover:underline"
                >
                  @{owner.username}
                </Link>
              </p>
              <TweetForm user={user} id={id} toggleModal={toggleModal} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
