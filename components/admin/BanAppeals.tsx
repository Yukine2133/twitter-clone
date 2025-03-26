"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { IAppeal } from "@/interfaces/appeal.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppealCard } from "./appeal/AppealCard";
import { AppealModal } from "./appeal/AppealModal";

export function BanAppeals({ appeals }: { appeals: IAppeal[] }) {
  const [filter, setFilter] = useState("All");
  const [selectedAppeal, setSelectedAppeal] = useState<any>(null);

  const filteredAppeals =
    filter === "All"
      ? appeals
      : appeals.filter((appeal) => appeal.status === filter);

  const handleApprove = () => {
    setSelectedAppeal(null);
  };

  const handleReject = () => {
    setSelectedAppeal(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight">Ban Appeals</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] bg-[#222] border-[#333] text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[#222] border-[#333] text-white">
            <SelectItem
              value="All"
              className="focus:bg-[#444] focus:text-white"
            >
              All Appeals
            </SelectItem>
            <SelectItem
              value="Pending"
              className="focus:bg-[#444] focus:text-white"
            >
              Pending
            </SelectItem>
            <SelectItem
              value="Approved"
              className="focus:bg-[#444] focus:text-white"
            >
              Approved
            </SelectItem>
            <SelectItem
              value="Rejected"
              className="focus:bg-[#444] focus:text-white"
            >
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredAppeals.map((appeal) => {
          const user = appeal.user as IUser;
          return (
            <AppealCard
              key={user._id}
              appeal={appeal}
              user={user}
              setSelectedAppeal={setSelectedAppeal}
            />
          );
        })}
      </div>

      {/* Review Appeal Dialog */}
      <AppealModal
        selectedAppeal={selectedAppeal}
        setSelectedAppeal={setSelectedAppeal}
      />
    </div>
  );
}
