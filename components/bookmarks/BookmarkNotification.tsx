interface IBookmarkNotificationProps {
  isBookmarkFolderModalOpen: boolean;
  setIsBookmarkFolderModalOpen: (arg0: boolean) => void;
  setShowBookmarkNotification: (arg0: boolean) => void;
}

export const BookmarkNotification = ({
  isBookmarkFolderModalOpen,
  setIsBookmarkFolderModalOpen,
  setShowBookmarkNotification,
}: IBookmarkNotificationProps) => {
  return (
    <div className="fixed bottom-10 transform translate-x-20 z-10">
      <div className="bg-blue-500 px-4 py-2 rounded-md z-10 flex gap-2">
        <h2>Added to your bookmarks. </h2>
        <button
          onClick={() => {
            setIsBookmarkFolderModalOpen(!isBookmarkFolderModalOpen);
            setShowBookmarkNotification(false);
          }}
          className="hover:underline font-medium"
        >
          Add to folder
        </button>
      </div>
    </div>
  );
};
