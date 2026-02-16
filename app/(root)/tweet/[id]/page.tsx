import { fetchTweet } from "@/actions/tweet.actions";
import useGetSingleTweet from "@/hooks/tweetsLogic/useGetSingleTweet";
import SingleTweet from "@/components/tweets/SingleTweet";
import { IBookmarkFolder } from "@/interfaces/bookmark.interface";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const tweet = await fetchTweet(id);
  return {
    title: tweet?.text,
  };
};

const SingleTweetPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const {
    owner,
    singleTweet,
    currentDbUser,
    isBookmarked,
    isLiked,
    isRetweeted,
    userBookmarkFolders,
  } = await useGetSingleTweet(id);
  return (
    <SingleTweet
      owner={owner}
      singleTweet={singleTweet}
      currentUser={currentDbUser}
      isBookmarked={isBookmarked}
      isLiked={isLiked}
      isRetweeted={isRetweeted}
      userBookmarkFolders={userBookmarkFolders as IBookmarkFolder[]}
    />
  );
};

export default SingleTweetPage;
