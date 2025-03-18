import type React from "react";
import "@/app/globals.css";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";

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
    <html lang="en">
      <body>
        <div className="flex h-screen ">
          <Sidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
