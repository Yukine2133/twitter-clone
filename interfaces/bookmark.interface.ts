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
