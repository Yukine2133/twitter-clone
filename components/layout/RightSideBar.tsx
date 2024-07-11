import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  return (
    <div className="px-3 mt-10 max-[1023px]:hidden ">
      <SearchInput path="search" />
    </div>
  );
};

export default RightSideBar;
