import { searchUsers } from "@/actions/user.actions";
import UserCard from "@/components/search/UserCard";
import SearchResults from "@/components/search/SearchResults";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  if (!searchParams.q) {
    return { title: "Explore" };
  }
  return {
    title: `${searchParams.q} - Search`,
  };
};

const SearchUsers = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;
  const users = await searchUsers(query);

  const renderUserResult = (user: any) => {
    return <UserCard user={user} key={user._id} />;
  };

  return (
    <SearchResults
      path="search/tabs/users"
      query={query}
      results={users!}
      renderResult={renderUserResult}
    />
  );
};

export default SearchUsers;
