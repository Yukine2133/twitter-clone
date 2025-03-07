import type { IMessage } from "@/interfaces/message.interface";
import { getMessages, markMessageAsRead } from "@/actions/message.actions";
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
  const { currentDbUser } = await useGetCurrentUser();

  const userId = searchParams.userId;
  const recipient = await fetchUser(userId);

  const initialMessages = (await getMessages(recipient._id)) as IMessage[];

  initialMessages.forEach(async (message) => {
    if (!message.read && message.sender._id !== currentDbUser._id) {
      await markMessageAsRead(message._id);
    }
  });

  return (
    <MessageWithTheUser
      initialMessages={initialMessages}
      recipientId={recipient._id}
      currentUser={currentDbUser}
      recipient={recipient}
    />
  );
};

export default MessageWithTheUserPage;
