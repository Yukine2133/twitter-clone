import { getBookmarksFromFolder } from "@/actions/bookmark.actions";
import ClientOnly from "@/components/ClientOnly";
import TweetCard from "@/components/tweets/TweetCard";
import React from "react";

const BookmarkFolder = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const name = params.name;

  const bookmarksFromFolder: any = await getBookmarksFromFolder(name);
  return (
    <div>
      <ClientOnly>
        {bookmarksFromFolder.map((bookmark: any) =>
          bookmark.bookmarks.map((tweet: any) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet.tweetId}
              owner={tweet.tweetId.user}
            />
          ))
        )}
      </ClientOnly>
    </div>
  );
};

export default BookmarkFolder;
