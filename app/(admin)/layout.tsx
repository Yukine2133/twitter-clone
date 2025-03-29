import type React from "react";
import "@/app/globals.css";
import { AdminProvider } from "@/components/admin/AdminProvider";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing users and ban appeals",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
