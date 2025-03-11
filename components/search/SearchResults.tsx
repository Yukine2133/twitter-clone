import Link from "next/link";
import SearchInput from "@/components/search/SearchInput";
import ClientOnly from "../loaders/ClientOnly";

const Tabs = ({ path }: { path: string }) => {
  return (
    <div className="mt-2 flex justify-around ">
      <Link
        className={path === "search" ? "border-b-2 border-blue-500" : ""}
        href="/search"
      >
        Tweets
      </Link>
      <Link
        className={
          path === "search/tabs/users" ? "border-b-2 border-blue-500" : ""
        }
        href="/search/tabs/users"
      >
        Users
      </Link>
    </div>
  );
};

const SearchResults = ({
  path,
  query,
  results,
  renderResult,
}: {
  path: string;
  query: string | null;
  results: any[] | null;
  renderResult: (result: any) => React.ReactNode;
}) => {
  if (!query) {
    return (
      <div className="mt-2 px-2 md:px-4">
        <SearchInput path={path} />
        <Tabs path={path} />
        <h2 className="mt-4 text-lg">Enter a search query to see results</h2>
      </div>
    );
  }

  return (
    <div className="mt-2 px-2 md:px-4">
      <SearchInput path={path} />
      <Tabs path={path} />
      {results && results.length === 0 ? (
        <h2 className="mt-2 text-lg">
          No results for{" "}
          <span className="font-semibold">&quot;{query}&quot;</span>{" "}
        </h2>
      ) : (
        <h2 className="mt-2 text-lg mb-2">
          Results for <span className="font-semibold">&quot;{query}&quot;</span>
        </h2>
      )}

      <ClientOnly>
        {results &&
          results.map((result) => {
            return renderResult(result);
          })}
      </ClientOnly>
    </div>
  );
};

export default SearchResults;
