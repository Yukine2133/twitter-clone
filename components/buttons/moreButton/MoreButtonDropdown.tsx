"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface MoreDropdownProps {
  isOpen: boolean;
  className?: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const MoreButtonDropdown = ({
  isOpen,
  className,
  handleEdit,
  handleDelete,
}: MoreDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-10 min-w-[180px] rounded-xl bg-black shadow-lg ring-1 ring-white/10 right-0 top-0 ${className}`}
    >
      <div className="py-1">
        <button
          onClick={handleEdit}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
        >
          <PencilIcon className="h-5 w-5 text-blue-500" />
          <span className="text-white">Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
        >
          <TrashIcon className="h-5 w-5 text-red-500" />
          <span className="text-red-500">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MoreButtonDropdown;
