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
      <header className="border-b border-neutral-800 p-4 flex items-center justify-between bg-black sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image
              src="/grokky.png"
              alt="Grokky"
              width={32}
              height={32}
              className="rounded-full bg-blue-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <SparklesIcon className="h-3 w-3 text-white" />
            </div>
          </div>
          <h1 className="font-bold text-xl">Grokky</h1>
        </div>
        <button className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors">
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </header>
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
