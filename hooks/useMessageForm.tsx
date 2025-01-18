import { sendMessage } from "@/actions/message.actions";
import { useState } from "react";
import { toast } from "react-toastify";

const useMessageForm = ({ recipientUserId }: { recipientUserId: string }) => {
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  return {
    content,
    setContent,
    imageUrl,
    setImageUrl,
    isOpen,
    setIsOpen,
    handleSubmit,
    handleKeyDown,
  };
};

export default useMessageForm;
