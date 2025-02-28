import { fetchPopularHashtags } from "@/actions/tweet.actions";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";

const PopularHashtags = async () => {
  const hashtags = await fetchPopularHashtags();

  return (
    <div className="rounded-2xl w-full max-w-[350px] bg-[#16181c] overflow-hidden mt-4">
      <h2 className="text-xl font-bold px-4 py-3">Popular Hashtags</h2>

      <div>
        {hashtags.length === 0 ? (
          <div className="px-4 py-8 text-center text-neutral-500">
            <ChartBarIcon className="h-7 w-7 mx-auto mb-2" />
            <p>No trending hashtags yet</p>
          </div>
        ) : (
          hashtags.slice(0, 6).map((hashtag) => (
            <Link
              key={hashtag._id}
              href={`/hashtag/${hashtag._id.substring(1)}`}
              className="block px-4 py-3 transition-colors hover:bg-white/[0.03]"
            >
              <div className="space-y-0.5">
                <h3 className="font-bold text-[15px] text-blue-500 ">
                  {hashtag._id}
                </h3>
                <p className="text-sm text-neutral-500">
                  {hashtag.count.toLocaleString()}{" "}
                  {hashtag.count === 1 ? "tweet" : "tweets"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularHashtags;
