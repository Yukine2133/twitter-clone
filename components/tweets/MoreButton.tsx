"use client";

import {
  deleteReply,
  deleteTweet,
  editReply,
  updateTweet,
} from "@/actions/tweet.actions";
import { IReply } from "@/types/tweet.interface";
import { combineUsername } from "@/utils/combineUsername";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

interface IMoreButton {
  id: string;
  tweet: {
    text: string;
    userId: string;
    replies: IReply[];
  };
  action: (id: string, replyId?: string) => void;
  replyId?: string;
  replyTweet?: string;
}
const MoreButton = ({
  id,
  tweet,
  action,
  replyId,
  replyTweet,
}: IMoreButton) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [text, setText] = useState(replyTweet ? replyTweet : tweet.text);

  const [edit, setEdit] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
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
        const res = await updateTweet(tweetId, text);
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Tweet was updated.");
        }
      } else {
        const res = await editReply(tweetId, text, replyId as string);
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Reply was updated.");
        }
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit(id, text as string);
      setEdit(false);
    }
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

  const isOwner =
    user?.id === tweet.userId ||
    tweet.replies.some((reply: any) => user?.id === reply.user);

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
                    <AiFillEdit /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 flex items-center gap-2"
                  >
                    <AiFillDelete /> Delete
                  </button>
                </>
              )}
            </div>
          )}
          {edit && (
            <div className="absolute  top-0 right-6">
              <input
                type="text"
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-transparent border border-gray-800 shadow-sm rounded-md p-2"
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MoreButton;
