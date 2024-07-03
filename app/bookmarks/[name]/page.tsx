import { getBookmarksFromFolder } from "@/actions/bookmark.actions";
import { fetchUser } from "@/actions/user.actions";
import ClientOnly from "@/components/ClientOnly";
import TweetCard from "@/components/tweets/TweetCard";
import { ITweet } from "@/types/tweet.interface";
import { IUser } from "@/types/user.interface";
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
          bookmark.bookmarks.map((jopa: any) => (
            <TweetCard
              key={jopa._id}
              tweet={jopa.tweetId}
              owner={jopa.tweetId.user}
            />
          ))
        )}
      </ClientOnly>
    </div>
  );
};

export default BookmarkFolder;
