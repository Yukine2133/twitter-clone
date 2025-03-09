import { useState, useRef, useEffect } from "react";
import { fetchAIResponse, fetchUserMessages } from "@/actions/grok.actions";

export const useGrokky = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I'm Grok, your AI assistant. I'm designed to be helpful, harmless, and honest. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const previousMessages = await fetchUserMessages();
      setMessages(previousMessages.length > 0 ? previousMessages : messages);
    };

    loadMessages();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    const aiResponse = await fetchAIResponse(userMessage);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: aiResponse },
    ]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown,
  };
};
