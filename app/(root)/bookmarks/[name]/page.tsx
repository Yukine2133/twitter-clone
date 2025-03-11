import { getBookmarksFromFolder } from "@/actions/bookmark.actions";
import GoBackButton from "@/components/buttons/GoBackButton";
import MoreButtonBookmarkFolder from "@/components/buttons/moreButton/MoreButtonBookmarkFolder";
import ClientOnly from "@/components/loaders/ClientOnly";
import TweetCard from "@/components/tweets/TweetCard";
import React from "react";

const BookmarkFolder = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const name = params.name.replace(/-/g, " ");

  const bookmarksFromFolder: any = await getBookmarksFromFolder(name);

  return (
    <div>
      <div className="flex items-center justify-between px-4 mt-2">
        <div className="flex gap-4 items-center  ">
          <GoBackButton route={"/bookmarks"} />
          <h2 className="font-semibold text-xl">{name}</h2>
        </div>
        <MoreButtonBookmarkFolder name={name} />
      </div>
      {bookmarksFromFolder.length === 0 ||
      bookmarksFromFolder[0]?.bookmarks?.length === 0 ? (
        <h3 className="p-4 text-xl">
          <span className="font-semibold">{name}</span> does not have any
          bookmarks.
        </h3>
      ) : (
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
      )}
    </div>
  );
};

export default BookmarkFolder;
