import { Home } from "lucide-react";

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
