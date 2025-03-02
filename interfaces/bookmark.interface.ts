export interface IBookmark {
  tweetId: string;
  userId: string;
  folderId: string;
}

export interface IBookmarkFolder {
  name: string;
  userId: string;
  bookmarks: IBookmark;
  _id: string;
}

export interface IBookmarkModalProps {
  isBookmarkFolderModalOpen: boolean;
  setIsBookmarkFolderModalOpen: (arg0: boolean) => void;
  userBookmarkFolders: IBookmarkFolder[];
  handleBookmarkFolderClick: (id: string) => void;
}

export interface BookmarkFolderItemProps {
  folder: any;
  index: number;
  onClick?: () => void;
  asLink?: boolean;
}

export interface IBookmarkNotificationProps {
  isBookmarkFolderModalOpen: boolean;
  setIsBookmarkFolderModalOpen: (arg0: boolean) => void;
  setShowBookmarkNotification: (arg0: boolean) => void;
}
