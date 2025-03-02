import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { colors } from "@/utils/colors";
import Link from "next/link";

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

  const bookmarksCount = folder.bookmarks.length || 0;

  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className={`${colorClass} rounded-full p-2.5`}>
          <BookmarkIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-left">{folder.name}</p>
          <p className="text-sm text-left text-neutral-500">
            {bookmarksCount || 0} Bookmarks
          </p>
        </div>
      </div>
      {asLink && <ChevronRightIcon className="w-5 h-5 text-neutral-500" />}
    </>
  );

  const commonClasses =
    "flex items-center justify-between w-full px-4 py-3 hover:bg-neutral-800 transition-colors duration-200";

  if (asLink) {
    return (
      <Link
        href={`/bookmarks/${folderNameWithHyphens}`}
        className={commonClasses}
      >
        {content}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className={commonClasses}>
        {content}
      </button>
    );
  }
};

export default BookmarkFolderItem;
