import { fetchTweet } from "@/actions/tweet.actions";
import useGetSingleTweet from "@/utils/lib/hooks/useGetSingleTweet";
import SingleTweet from "@/components/tweets/SingleTweet";
import { IBookmarkFolder } from "@/types/bookmark.interface";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const tweet = await fetchTweet(params.id);
  return {
    title: tweet?.text,
  };
};

const SingleTweetPage = async ({ params }: { params: { id: string } }) => {
  const {
    owner,
    singleTweet,
    currentUser,
    isBookmarked,
    isLiked,
    isRetweeted,
    userBookmarkFolders,
  } = await useGetSingleTweet(params.id);
  return (
    <SingleTweet
      owner={owner}
      singleTweet={singleTweet}
      currentUser={currentUser}
      isBookmarked={isBookmarked}
      isLiked={isLiked}
      isRetweeted={isRetweeted}
      userBookmarkFolders={userBookmarkFolders as IBookmarkFolder[]}
    />
  );
};

export default SingleTweetPage;
