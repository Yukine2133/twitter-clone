import { fetchBookmarksForTweet } from "@/actions/bookmark.actions";

export const useFetchBookmarksForTweet = async (
  id: string,
  userId: string | undefined
) => {
  const bookmarksData = await fetchBookmarksForTweet(id);

  const bookmarks = Array.isArray(bookmarksData) ? bookmarksData : [];

  // Check if the user's ID is included in the bookmarks array
  const isBookmarked = bookmarks.some(
    (bookmark: { userId: string }) => bookmark.userId === userId
  );
  return isBookmarked;
};
