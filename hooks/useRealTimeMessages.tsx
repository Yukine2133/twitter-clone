import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { IMessage } from "@/interfaces/message.interface";

const useRealTimeMessages = (
  initialMessages: IMessage[],
  recipientId: string,
  currentUserId: string
) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const channelName = [currentUserId, recipientId].sort().join("-");

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe(`chat-${channelName}`);

    channel.bind("new-message", (newMessage: { message: IMessage }) => {
      setMessages((prevMessages) => [...prevMessages, newMessage.message]);
    });

    channel.bind("typing", (data: { senderId: string; isTyping: boolean }) => {
      if (data.senderId !== currentUserId) {
        setIsTyping(data.isTyping);
      }
    });

    channel.bind("message-deleted", (deletedMessage: { messageId: string }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessage.messageId)
      );
    });

    channel.bind("message-edited", (editedMessage: { message: IMessage }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === editedMessage.message._id ? editedMessage.message : msg
        )
      );
    });

    return () => {
      pusher.unsubscribe(`chat-${channelName}`);
    };
  }, [recipientId, currentUserId]);

  return { messages, isTyping };
};

export default useRealTimeMessages;
