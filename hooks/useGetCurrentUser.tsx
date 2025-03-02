import { fetchUser } from "@/actions/user.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const useGetCurrentUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const currentUser = await fetchUser(user?.id as string);
  return { currentUser, user };
};
