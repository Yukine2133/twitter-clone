import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";

const ProfilePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const username = params.username;
  const user = await fetchUser(undefined, username);

  if (!user)
    return (
      <h1 className="text-xl pt-3">
        User with this username {username} does not exist.{" "}
      </h1>
    );
  return (
    <div>
      {user.username}
      <Image src={user.avatar} alt={user.username} width={64} height={64} />
    </div>
  );
};

export default ProfilePage;
