import SearchInput from "../search/SearchInput";

const RightSideBar = () => {
  return (
    <div className="pl-3 mt-10 max-[900px]:hidden ">
      <SearchInput path="search" />
    </div>
  );
};

export default RightSideBar;
