"use client";

import { useState } from "react";

import { AppealFilter, IAppeal } from "@/interfaces/appeal.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppealCard } from "./appeal/AppealCard";
import { AppealModal } from "./appeal/AppealModal";
import { AppealSelect } from "./appeal/AppealSelect";

export function BanAppeals({ appeals }: { appeals: IAppeal[] }) {
  const [filter, setFilter] = useState<AppealFilter>("All");
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
      <AppealSelect filter={filter} setFilter={setFilter} />

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
