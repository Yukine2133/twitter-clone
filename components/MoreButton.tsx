"use client";

import { deleteTweet, updateTweet } from "@/lib/actions/tweet.actions";
import { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

const MoreButton = ({
  id,
  tweet,
}: {
  id: string;
  tweet: {
    text: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(tweet.text);
  const [edit, setEdit] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  const handleEdit = async (text: string, id: string) => {
    try {
      await updateTweet(text, id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit(text, id);
      setEdit(false);
    }
  };

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
          <button
            onClick={() => {
              setEdit(!edit);
              setIsOpen(false); // Close the dropdown when toggling edit mode
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
