"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  SparklesIcon,
  ArrowPathIcon,
  PaperAirplaneIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchAIResponse } from "@/actions/grok.actions";

const GrokPage = () => {
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
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-800 text-white"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/grokky.png"
                      alt="Grokky"
                      width={24}
                      height={18}
                      className="rounded-full object-cover h-6 bg-blue-500"
                    />
                  </div>
                  <span className="font-bold text-sm">Grok</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>

              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mt-3 text-neutral-400">
                  <button className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors">
                    <HandThumbUpIcon className="h-4 w-4" />
                  </button>
                  <button className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors">
                    <HandThumbDownIcon className="h-4 w-4" />
                  </button>
                  <button className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors">
                    <ClipboardDocumentIcon className="h-4 w-4" />
                  </button>
                  <button className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors">
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 rounded-2xl p-4 max-w-[80%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative h-6 w-6">
                  <Image
                    src="/grokky.png"
                    alt="Grokky"
                    width={24}
                    height={18}
                    className="rounded-full object-cover h-6 bg-blue-500"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
                    <SparklesIcon className="h-2 w-2 text-white" />
                  </div>
                </div>
                <span className="font-bold text-sm">Grok</span>
              </div>
              <div className="flex space-x-2">
                <div
                  className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-neutral-800 p-4 bg-black">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-center bg-neutral-800 rounded-2xl px-4 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Grok..."
              className="flex-grow bg-transparent outline-none resize-none max-h-32"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`ml-2 p-2 rounded-full ${
                input.trim() && !isLoading
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-neutral-700 text-neutral-400"
              } transition-colors`}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2 text-center">
            Grokky may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </form>
      </div>
    </div>
  );
};

export default GrokPage;
