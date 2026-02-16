import { searchUsers } from "@/actions/user.actions";
import UserCard from "@/components/search/UserCard";
import SearchResults from "@/components/search/SearchResults";
import { IUser } from "@/interfaces/user.interface";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const { q } = await searchParams;
  if (!q) {
    return { title: "Explore" };
  }
  return {
    title: `${q} - Search`,
  };
};

const SearchUsers = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const { q } = await searchParams;
  const users = await searchUsers(q);

  const renderUserResult = (user: IUser) => {
    return <UserCard user={user} key={user._id} />;
  };

  return (
    <SearchResults
      path="search/tabs/users"
      query={q}
      results={users!}
      renderResult={renderUserResult}
    />
  );
};

export default SearchUsers;
