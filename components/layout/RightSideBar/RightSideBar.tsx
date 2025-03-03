import dynamic from "next/dynamic";
import PopularHashtags from "./PopularHashtags";
import FollowSuggestions from "@/components/follow/FollowSuggestions";

const SearchInput = dynamic(() => import("../../search/SearchInput"), {
  ssr: false, //  disables SSR for SearchInput
});

const RightSideBar = () => {
  return (
    <div className="px-3 sticky top-10 max-[1023px]:hidden ">
      <SearchInput path="search" />
      <PopularHashtags />
      <FollowSuggestions />
    </div>
  );
};

export default RightSideBar;
