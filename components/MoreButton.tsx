"use client";

import { deleteTweet } from "@/lib/actions/tweet.actions";
import { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

const MoreButton = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteTweet(id);
    } catch (error) {
      console.error(error);
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
        <div className="absolute top-0   right-3 p-3 ">
          <button className="text-blue-500 flex items-center gap-2">
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
    </>
  );
};

export default MoreButton;
