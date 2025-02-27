// In RightSideBar.tsx
import dynamic from "next/dynamic";
import PopularHashtags from "../PopularHashtags";

const SearchInput = dynamic(() => import("../search/SearchInput"), {
  ssr: false, // This disables SSR for SearchInput
});

const RightSideBar = () => {
  return (
    <div className="px-3 mt-10 max-[1023px]:hidden ">
      <SearchInput path="search" />
      <PopularHashtags />
    </div>
  );
};

export default RightSideBar;
