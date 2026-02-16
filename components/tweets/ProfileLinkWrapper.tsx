"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const ProfileLinkWrapper = ({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div className={`${className}`} onClick={() => router.push(href)}>
      {children}
    </div>
  );
};
