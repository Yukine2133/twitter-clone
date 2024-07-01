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
      className="mt-20 max-h-[800px] remove-scrollbar overflow-y-auto"
    >
      {children}
    </div>
  );
};

export default AutoScrollMessages;
