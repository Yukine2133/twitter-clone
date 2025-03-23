import type React from "react";
import "@/app/globals.css";

export const metadata = {
  title: "Twitter Clone Admin Dashboard",
  description: "Admin dashboard for managing users and ban appeals",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
