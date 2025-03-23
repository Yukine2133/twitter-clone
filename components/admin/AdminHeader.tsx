import { Bell, ChevronDown, Home, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="border-b border-[#333] bg-black">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6 text-[#1d9bf0]" />
            <span className="text-xl hidden md:inline-block">
              Admin Dashboard
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
