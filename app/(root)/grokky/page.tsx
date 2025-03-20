"use client";

import type React from "react";

import { SparklesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useGrokky } from "@/hooks/useGrokky";
import { GrokkyMessageCard } from "@/components/grokky/GrokkyMessageCard";
import { GrokkyLoadingCard } from "@/components/grokky/GrokkyLoadingCard";
import { GrokkyMessageForm } from "@/components/grokky/GrokkyMessageForm";
import AutoScrollMessages from "@/components/messages/AutoScrollMessages";
import Loading from "@/components/loaders/Loading";
import { GrokkyHeader } from "@/components/grokky/GrokkyHeader";

const GrokkyPage = () => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown,
  } = useGrokky();

  return (
    <div className="flex flex-col h-screen">
      <GrokkyHeader />
      <AutoScrollMessages>
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {messages.map((message, index) => (
            <GrokkyMessageCard
              messageContent={message.content}
              messageRole={message.role}
              key={index}
            />
          ))}
          {!messages.length && <Loading />}
          {isLoading && <GrokkyLoadingCard />}
        </div>
      </AutoScrollMessages>
      <GrokkyMessageForm
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default GrokkyPage;
