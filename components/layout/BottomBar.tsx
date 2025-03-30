import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import BottomBarUI from "./BottomBar/BottomBarUI";

const BottomBar = async () => {
  const { currentDbUser } = await useGetCurrentUser();

  return <BottomBarUI currentDbUser={currentDbUser} />;
};

export default BottomBar;
