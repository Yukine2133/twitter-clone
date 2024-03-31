"use client";

// import { addTweetToBookmarks } from "@/lib/actions/bookmarks.actions";
import { deleteTweet, updateTweet } from "@/lib/actions/tweet.actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
interface IMoreButton {
  id: string;
  tweet: {
    text: string;
    userId: string;
  };
}
const MoreButton = ({ id, tweet }: IMoreButton) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(tweet.text);
  const [edit, setEdit] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useKindeBrowserClient();

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

  const handleDelete = async (id: string) => {
    try {
      await deleteTweet(id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async (text: string, tweetId: any) => {
    try {
      let id: any;
      id = tweetId.toString();
      await updateTweet(text, id);
    } catch (error) {
      console.error(error);
    }
  };
  // const addBookmark = async (tweetId: string) => {
  //   try {
  //     let id: any;
  //     id = tweetId.toString();
  //     await addTweetToBookmarks(user?.id as any, id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit(text, id);
      setEdit(false);
    }
  };

  const isOwner = user?.id === tweet.userId;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="rotate-90 relative"
      >
        &#10247;
      </button>
      {isOpen && (
        <div className="absolute top-0 right-3 p-3">
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
                onClick={() => handleDelete(id)}
                className="text-red-500 flex items-center gap-2"
              >
                <AiFillDelete /> Delete
              </button>
            </>
          )}
          {/* <button onClick={() => addBookmark(id)}>Bookmark</button> */}
        </div>
      )}
      {edit && (
        <div className="absolute top-0 right-6">
          <input
            type="text"
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent border border-gray-800 shadow-sm rounded-md px-2 py-1"
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </>
  );
};

export default MoreButton;
