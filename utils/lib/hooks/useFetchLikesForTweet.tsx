import { fetchLikesForTweet } from "@/actions/like.actions";

const useFetchLikesForTweet = async (
  id: string,
  userId: string | undefined
) => {
  const likesData = await fetchLikesForTweet(id);

  const likes = Array.isArray(likesData) ? likesData : [];

  // Check if the user's ID is included in the likes array
  const isLiked = likes.some(
    (like: { userId: string }) => like.userId === userId
  );
  return isLiked;
};

export default useFetchLikesForTweet;
