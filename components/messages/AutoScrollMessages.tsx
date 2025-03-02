"use client";

import { type ReactNode, useEffect, useRef } from "react";

const AutoScrollMessages = ({ children }: { children: ReactNode }) => {
  const messagesContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const container = messagesContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scroll();
  }, []);

  return (
    <div
      ref={messagesContainer}
      className="flex-grow overflow-y-auto custom-scrollbar"
    >
      {children}
    </div>
  );
};

export default AutoScrollMessages;
