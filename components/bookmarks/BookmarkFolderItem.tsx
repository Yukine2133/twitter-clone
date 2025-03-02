import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { colors } from "@/utils/colors";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface BookmarkFolderItemProps {
  folder: any;
  index: number;
  onClick?: () => void;
  asLink?: boolean;
}

const BookmarkFolderItem = ({
  folder,
  index,
  onClick,
  asLink = true,
}: BookmarkFolderItemProps) => {
  const colorClass = colors[index % colors.length];
  const folderNameWithHyphens = folder.name.replace(/\s+/g, "-");

  const content = (
    <div className="flex items-center gap-4">
      <div className={`${colorClass} rounded-full p-[10px]`}>
        <BookmarkIcon className="size-6 z-10" />
      </div>
      <p>{folder.name}</p>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={`/bookmarks/${folderNameWithHyphens}`}
        className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
      >
        {content}
        <ChevronRightIcon className="size-5" />
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-600/20 transition-colors duration-300 w-full"
      >
        {content}
      </button>
    );
  }
};

export default BookmarkFolderItem;
