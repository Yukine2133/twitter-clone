"use client";

import { ReactNode, useEffect, useRef } from "react";

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
  }, [children]);

  return (
    <div
      ref={messagesContainer}
      className="mt-20 max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar  "
    >
      {children}
    </div>
  );
};

export default AutoScrollMessages;
