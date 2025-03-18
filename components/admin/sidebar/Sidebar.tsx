"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  LogOut,
  Twitter,
} from "lucide-react";
import { cn } from "@/utils/cn";

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      href: "/admin/ban-appeals",
      icon: ShieldAlert,
      label: "Ban Appeals",
    },
  ];

  return (
    <div className="h-full w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 flex items-center">
        <Twitter className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
              pathname === route.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <route.icon className="mr-3 h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-secondary rounded-md transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
