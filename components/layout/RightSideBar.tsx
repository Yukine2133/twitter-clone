import FollowSuggestions from "../follow/FollowSuggestions";
import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  return (
    <div className="px-3 mt-10 max-[900px]:hidden ">
      <SearchInput path="search" />
      <FollowSuggestions />
    </div>
  );
};

export default RightSideBar;
