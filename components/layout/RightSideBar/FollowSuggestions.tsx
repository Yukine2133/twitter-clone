import Link from "next/link";
import { getQueryClient } from "@/utils/lib/getQueryClient";
import { fetchFollowSuggestions } from "@/actions/user.actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { FollowSuggestionCard } from "./FollowSuggestionCard";
import ClientOnly from "../../loaders/ClientOnly";
import { currentUser } from "@clerk/nextjs/server";

const FollowSuggestions = async () => {
  const user = await currentUser();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["followSuggestions", user?.id],
    queryFn: () => fetchFollowSuggestions(user?.id as string),
  });

  return (
    <div className="mt-4 w-full max-w-[350px] bg-[#16181c] rounded-2xl overflow-hidden">
      <h2 className="text-xl font-bold px-4 py-3">Who to follow</h2>
      <div className="divide-y divide-gray-800">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ClientOnly>
            <FollowSuggestionCard userId={user?.id as string} />
          </ClientOnly>
        </HydrationBoundary>
      </div>
      <Link
        href="/connect"
        className="block px-4 py-4 text-[15px] text-blue-500 hover:bg-white/[0.03] transition-colors"
      >
        Show more
      </Link>
    </div>
  );
};

export default FollowSuggestions;
