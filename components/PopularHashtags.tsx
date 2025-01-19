import { fetchPopularHashtags } from "@/actions/tweet.actions";
import Link from "next/link";
import React from "react";

const PopularHashtags = async () => {
  const hashtags = await fetchPopularHashtags();

  return (
    <div className="mt-4 ">
      <h2 className="text-xl font-semibold mb-2">Popular Hashtags</h2>
      <div className="space-y-2">
        {hashtags.map((hashtag) => (
          <div className="w-[230px]" key={hashtag._id}>
            <Link href={`/hashtag/${hashtag._id.substring(1)}`}>
              <h3
                style={{ overflowWrap: "anywhere" }}
                className="text-blue-500 "
              >
                {hashtag._id}
              </h3>
            </Link>
            <h4 className="text-sm text-gray-100">{hashtag.count} tweets</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularHashtags;
