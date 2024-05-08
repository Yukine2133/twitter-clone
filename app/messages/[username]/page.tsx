import { fetchUser } from "@/actions/user.actions";
import Image from "next/image";

const MessageWithTheUser = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const username = params.username;
  const recipient = await fetchUser(undefined, username);

  return (
    <div className=" h-[5000px]">
      <div className="flex border-b pb-2 border-[#2f3336] w-[620px] fixed top-4 items-center gap-3 ">
        <Image
          src={recipient.avatar}
          alt="Recipient avatar"
          width={50}
          height={50}
          className="rounded-full "
        />
        <div>
          <h2 className="font-semibold  mb-1">{recipient.displayName}</h2>
          <h2 className=" text-gray-500 text-sm">@{recipient.username}</h2>
        </div>
      </div>
      <div className="mt-20 ">
        <h2>jopka</h2>

        <div className="fixed bottom-4">
          <input
            className="bg-[#202327] placeholder:text-zinc-500"
            placeholder="Send a message"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageWithTheUser;
