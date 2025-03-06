import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

export const useGetCurrentUser = async () => {
  const user = await currentUser();
  const currentDbUser = await fetchUser(user?.id as string);
  return { currentDbUser, user };
};
