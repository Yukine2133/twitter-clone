import { fetchPopularHashtags } from "@/actions/tweet.actions";
import React from "react";

const PopularHashtags = async () => {
  const hashtags = await fetchPopularHashtags();

  return (
    <div className="mt-4 w-[100px]">
      {hashtags.map((hashtag) => (
        <div key={hashtag._id}>
          <h2 className="text-blue-500">{hashtag._id}</h2>
          <h3>{hashtag.count} tweets</h3>
        </div>
      ))}
    </div>
  );
};

export default PopularHashtags;
