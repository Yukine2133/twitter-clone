// import { useState } from "react";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import UserSuggestionList from "@/components/UserSuggestionList";

const ConnectPage = () => {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-4 px-4 py-3">
          <Link href="/" className="rounded-full p-2 hover:bg-white/10">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Connect</h1>
        </div>
        <div className="border-b border-neutral-800 px-4 pb-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search people"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-neutral-900 py-2 pl-10 pr-4 text-white placeholder-neutral-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-neutral-800 px-4 py-3">
          <h2 className="mb-4 text-xl font-bold">Suggested for you</h2>
          <UserSuggestionList />
        </section>
      </main>
    </div>
  );
};

export default ConnectPage;
