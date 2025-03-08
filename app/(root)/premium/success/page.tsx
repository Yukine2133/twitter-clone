import Link from "next/link";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-lg bg-neutral-900 rounded-2xl p-8 text-center shadow-lg border border-neutral-800">
        <div className="mx-auto mb-6 bg-blue-500/10 p-4 rounded-full inline-block">
          <CheckCircleIcon className="h-16 w-16 text-blue-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Subscription Successful!
        </h1>

        <p className="text-lg mb-6 text-neutral-300">
          Thank you for upgrading to Premium. Your account has been successfully
          upgraded and all premium features are now unlocked.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-neutral-800 p-3 rounded-lg">
            <span className="block text-blue-400 text-sm mb-1">
              Ad-Free Experience
            </span>
            <span className="text-xs text-neutral-400">
              Enjoy Twitter without interruptions
            </span>
          </div>
          <div className="bg-neutral-800 p-3 rounded-lg">
            <span className="block text-blue-400 text-sm mb-1">
              Longer Posts
            </span>
            <span className="text-xs text-neutral-400">
              Express yourself with 4,000 characters
            </span>
          </div>
          <div className="bg-neutral-800 p-3 rounded-lg">
            <span className="block text-blue-400 text-sm mb-1">
              Edit Tweets
            </span>
            <span className="text-xs text-neutral-400">
              Fix typos and mistakes
            </span>
          </div>
          <div className="bg-neutral-800 p-3 rounded-lg">
            <span className="block text-blue-400 text-sm mb-1">
              Verified Badge
            </span>
            <span className="text-xs text-neutral-400">
              Stand out with a blue checkmark
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors w-full"
        >
          Start Exploring
        </Link>

        <p className="mt-6 text-sm text-neutral-500">
          Have questions?{" "}
          <Link href="/help" className="text-blue-400 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
