import { sendMessage, triggerTypingEvent } from "@/actions/message.actions";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const useMessageForm = ({
  recipientUserId,
  currentUserId,
}: {
  recipientUserId: string;
  currentUserId: string;
}) => {
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [imageProgress, setImageProgress] = useState(0);

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const uploadImageButtonRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const hasImageUrl = !!imageUrl;

      // If there's neither text nor image, throw an error
      if (!content && !hasImageUrl) {
        throw new Error("Message must contain text or an image.");
      }

      formData.append("content", content);
      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      const res = await sendMessage(recipientUserId, formData);
      if (res?.message) {
        toast.error(res.message);
      }

      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setImageUrl(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter and not holding down Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const channelName = [currentUserId, recipientUserId].sort().join("-");

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      triggerTypingEvent(channelName, currentUserId, true);
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
        triggerTypingEvent(channelName, currentUserId, false);
      }, 1000)
    );
  };

  return {
    content,
    setContent,
    imageUrl,
    setImageUrl,
    uploadImageButtonRef,
    imageProgress,
    setImageProgress,
    handleSubmit,
    handleKeyDown,
    handleTyping,
  };
};

export default useMessageForm;
