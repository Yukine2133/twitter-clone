"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { IMessage } from "@/interfaces/message.interface";

const useRealTimeMessages = (
  initialMessages: IMessage[],
  recipientId: string,
  currentUserId: string
) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

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

    return () => {
      pusher.unsubscribe(`chat-${channelName}`);
    };
  }, [recipientId, currentUserId]);

  return messages;
};

export default useRealTimeMessages;
