"use client";

import { deleteReply, editReply } from "@/actions/reply.actions";
import { deleteTweet, updateTweet } from "@/actions/tweet.actions";
import { IReply } from "@/types/tweet.interface";
import { combineUsername } from "@/utils/combineUsername";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import { tweetTextSchema } from "@/utils/lib/validation";
import { z } from "zod";
import Image from "next/image";

interface IMoreButton {
  id: string;
  tweet: {
    text: string;
    userId: string;
    replies: IReply[];
    _id: string;
    image: string;
  };
  reply?: IReply;
  replyId?: string;
  replyTweet?: string;
}
const MoreButton = ({ id, reply, tweet, replyId, replyTweet }: IMoreButton) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [text, setText] = useState<string | null>(
    replyTweet ? replyTweet : tweet.text
  );

  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    replyTweet ? (reply?.image as string) : tweet.image
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const divRef = useRef<HTMLInputElement | null>(null);

  const { user } = useKindeBrowserClient();

  const fullUsername =
    user && combineUsername(user?.given_name, user?.family_name);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideEdit = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setEdit(false);
      }
    };

    if (edit) {
      document.addEventListener("click", handleClickOutsideEdit);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideEdit);
    };
  }, [edit]);

  const handleEdit = async (tweetId: string, text: string) => {
    try {
      if (
        pathname === `/profile/${fullUsername}` ||
        pathname === "/bookmarks" ||
        pathname === "/" ||
        pathname === "/search"
      ) {
        // If there's neither text nor image, throw an error
        if (!text && !imageUrl) {
          throw new Error("Tweet must contain text or an image.");
        }

        // If there's text, validate it
        if (text && text.trim().length > 0) {
          tweetTextSchema.parse(text);
        }
        const res = await updateTweet(tweetId, text, imageUrl as string);
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Tweet was updated.");
        }
      } else {
        const res = await editReply(
          replyId as string,
          tweetId,
          text,
          imageUrl as string
        );
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Reply was updated.");
        }
      }
      setEdit(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error(String(error));
      }
    }
  };

  const handleSubmit = () => {
    handleEdit(id, text as string);
  };

  const handleDelete = async () => {
    if (replyId) {
      const res = await deleteReply(id, replyId);
      if (res?.message) {
        toast.error(res?.message);
      } else {
        toast.success("Reply was deleted.");
      }
    } else {
      const res = await deleteTweet(id);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Tweet was deleted.");
      }
    }
  };

  const isOwner = user?.id === tweet.userId || reply?.userId;

  return (
    <>
      {isOwner && (
        <>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="rotate-90 relative"
          >
            &#10247;
          </button>
          {isOpen && (
            <div className="absolute -top-9 right-3 p-3">
              {isOwner && (
                <>
                  <button
                    onClick={() => {
                      setEdit(!edit);
                      setIsOpen(false);
                    }}
                    className="text-blue-500 flex items-center gap-2"
                  >
                    <PencilIcon className="h-5 w-5" /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 flex items-center gap-2"
                  >
                    <TrashIcon className="h-5 w-5" /> Delete
                  </button>
                </>
              )}
            </div>
          )}
          {edit && (
            <Modal isModalOpen={edit} toggleModal={setEdit}>
              <ReactTextareaAutosize
                maxRows={6}
                value={text as string}
                maxLength={280}
                wrap="soft"
                onChange={(e) => setText(e.target.value)}
                className="bg-transparent border border-gray-800 shadow-sm rounded-md flex justify-center w-full mx-auto p-2"
              />
              <UploadDropzone
                endpoint={"media"}
                onClientUploadComplete={(res) => {
                  if (res?.[0].url) {
                    setImageUrl(res[0].url);
                    toast.success("Image was added successfully.");
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(String(error));
                }}
              />
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  width={250}
                  height={250}
                  className="rounded-lg mx-auto mb-6"
                />
              )}
              <button
                onClick={handleSubmit}
                className="px-3 py-2 rounded-md flex justify-center mx-auto  bg-blue-600"
              >
                Submit
              </button>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default MoreButton;
