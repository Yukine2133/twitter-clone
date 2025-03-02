import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { shuffleArray } from "@/utils/shuffleArray";
import { IUsersData } from "@/interfaces/user.interface";

export const useFollowSuggestions = async () => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const fetchData = async () => {
    try {
      const currentUserData = await fetchUser(currentUser?.id);

      const usersData: any = await fetchUsers(currentUserData?._id);
      const shuffledUsers = shuffleArray(usersData);
      const randomUsersData = shuffledUsers.slice(0, 3);

      return { randomUsersData, currentUserData };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { randomUsersData, currentUserData } =
    (await fetchData()) as IUsersData;
  return { randomUsersData, currentUserData, currentUser };
};
