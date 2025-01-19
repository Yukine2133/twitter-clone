import PopularHashtags from "../PopularHashtags";
import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  return (
    <div className="px-3 mt-10 max-[1023px]:hidden ">
      <SearchInput path="search" />
      <PopularHashtags />
    </div>
  );
};

export default RightSideBar;
