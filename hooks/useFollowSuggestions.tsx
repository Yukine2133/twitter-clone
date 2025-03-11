import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { shuffleArray } from "@/utils/shuffleArray";
import { IUsersData } from "@/interfaces/user.interface";
import { currentUser } from "@clerk/nextjs/server";

export const useFollowSuggestions = async () => {
  const user = await currentUser();

  const fetchData = async () => {
    try {
      const currentUserData = await fetchUser(user?.id);

      const usersData: any = await fetchUsers(currentUserData?._id);
      const shuffledUsers = shuffleArray(usersData);
      const randomUsersData = shuffledUsers.slice(0, 3);

      return { randomUsersData, currentUserData };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const { randomUsersData, currentUserData } =
  //   (await fetchData()) as IUsersData;
  return { fetchData, user };
};
