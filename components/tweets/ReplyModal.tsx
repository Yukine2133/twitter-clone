import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";
import TweetForm from "./tweetForm/TweetForm";
import { IUser } from "@/interfaces/user.interface";

interface IReplyModalProps {
  id: string;
  toggleModal: () => void;
  isModalOpen: boolean;
  owner: IUser;
  tweetText: string;
  user: IUser;
}

export const ReplyModal = ({
  id,
  toggleModal,
  isModalOpen,
  owner,
  tweetText,
  user,
}: IReplyModalProps) => {
  return (
    <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
      <div className="relative max-h-[90vh] overflow-y-auto">
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
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <Link
                  href={`/profile/${owner.username}`}
                  className="font-bold hover:underline"
                >
                  {owner.username}
                </Link>
                {/* {owner.isVerified && <CheckBadgeIcon className="h-5 w-5 text-blue-500" />} */}
              </div>
              <p className="whitespace-pre-wrap break-words text-[15px] text-neutral-100">
                {tweetText}
              </p>
            </div>
          </div>
          <div className="my-2 translate-x-5 h-8 w-0.5 bg-neutral-800" />

          <div className="flex ">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.username}
              width={48}
              height={48}
              className="h-12 w-12  rounded-full object-cover"
            />

            <div className="flex-1">
              <p className=" ml-4  text-sm text-neutral-500">
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
