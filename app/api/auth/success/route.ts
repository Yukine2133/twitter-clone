import { combineUsername } from "@/lib/combineUsername";
import { connectDb } from "@/lib/connectDb";
import { User } from "@/lib/models/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
  await connectDb();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  let username = combineUsername(user?.given_name, user?.family_name);

  // if (existingUser) {
  //   let count = 1;
  //   let newUsername;
  //   do {
  //     newUsername = `${username}${count}`;
  //     count++;
  //   } while (await User.findOne({ username: newUsername }));
  //   username = newUsername;
  // }

  let dbUser = await User.findOne({ userId: user.id });

  if (!dbUser) {
    dbUser = await User.create({
      username,
      avatar: user.picture,
      userId: user.id,
    });
  }

  return redirect("http://localhost:3000");
}
