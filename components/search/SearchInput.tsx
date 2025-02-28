"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ path }: { path: string }) => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : null
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURIComponent(searchQuery);
    if (encodedSearchQuery) {
      router.push(`/${path}?q=${encodedSearchQuery}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={onSearch}
      className="items-center  flex justify-start   w-full max-w-[350px] px-2 rounded-full bg-[#27272a]"
    >
      <input
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search"
        className="p-2 bg-transparent  outline-none w-full text-sm lg:text-base"
      />
    </form>
  );
};

export default SearchInput;
