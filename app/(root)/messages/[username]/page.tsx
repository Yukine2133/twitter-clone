import type { IMessage } from "@/interfaces/message.interface";
import { getMessages } from "@/actions/message.actions";
import { fetchUser } from "@/actions/user.actions";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import MessageWithTheUser from "@/components/messages/MessageWithTheUser";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  return {
    title: `${params.username} - Messages`,
  };
};

const MessageWithTheUserPage = async ({
  searchParams,
}: {
  searchParams: {
    userId: string;
  };
}) => {
  const { currentUser } = await useGetCurrentUser();

  const userId = searchParams.userId;
  const recipient = await fetchUser(userId);

  const initialMessages = (await getMessages(recipient._id)) as IMessage[];

  return (
    <MessageWithTheUser
      initialMessages={initialMessages}
      recipientId={recipient._id}
      currentUser={currentUser}
      recipient={recipient}
    />
  );
};

export default MessageWithTheUserPage;
