import { searchUsers } from "@/actions/user.actions";
import SearchInput from "@/components/search/SearchInput";
import UserCard from "@/components/search/UserCard";
import Link from "next/link";

const SearchUsers = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;

  const users = await searchUsers(query);

  if (!users) {
    return null;
  }

  if (!query) {
    return (
      <div className="mt-2">
        <SearchInput path="search/tabs/users" />
        <div className="mt-2 flex justify-around ">
          <Link href="/search">Tweets</Link>
          <Link href={"/search/tabs/users"}>Users</Link>
        </div>
        <h2 className="mt-4 text-lg">Enter a search query to see results</h2>
      </div>
    );
  }
  return (
    <div className="mt-2 ">
      <SearchInput path="search/tabs/users" />
      <div className="mt-2 flex justify-around ">
        <Link href="/search">Tweets</Link>
        <Link href={"/search/tabs/users"}>Users</Link>
      </div>

      {users.length === 0 ? (
        <h2 className="mt-2 text-lg">
          No results for{" "}
          <span className="font-semibold">&quot;{query}&quot;</span>{" "}
        </h2>
      ) : (
        <h2 className="mt-2 text-lg mb-2">
          Results for <span className="font-semibold">&quot;{query}&quot;</span>
        </h2>
      )}

      {users.map((user) => {
        return <UserCard user={user} key={user._id} />;
      })}
    </div>
  );
};

export default SearchUsers;
