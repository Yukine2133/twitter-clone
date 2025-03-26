"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, Clock, X } from "lucide-react";
import { IAppeal } from "@/interfaces/appeal.interface";
import { IUser } from "@/interfaces/user.interface";
import { formatDate } from "@/utils/formatTimestamp";

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
            <div
              key={user._id}
              className="bg-[#111] border border-[#222] rounded-lg overflow-hidden"
            >
              <div className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.displayName} />
                      <AvatarFallback className="bg-[#333] text-white">
                        {user.displayName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-semibold">
                        {user.displayName}
                      </div>
                      <div className="text-sm text-gray-400">
                        {user.username}
                      </div>
                    </div>
                  </div>
                  {appeal.status === "Pending" && (
                    <span className="inline-flex items-center rounded-full border border-[#333] px-2.5 py-0.5 text-xs font-semibold text-gray-200">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </span>
                  )}
                  {appeal.status === "Approved" && (
                    <span className="inline-flex items-center rounded-full bg-[#1d9bf0] px-2.5 py-0.5 text-xs font-semibold text-white">
                      <Check className="mr-1 h-3 w-3" />
                      Approved
                    </span>
                  )}
                  {appeal.status === "Rejected" && (
                    <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                      <X className="mr-1 h-3 w-3" />
                      Rejected
                    </span>
                  )}
                </div>
              </div>
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-1 text-sm mb-2">
                  <div className="text-gray-400">Ban Reason:</div>
                  <div>{appeal.banReason}</div>
                  {/* <div className="text-gray-400">Ban Date:</div>
                  <div>{appeal.createdAt}</div> */}

                  <div className="text-gray-400">Appeal Date:</div>
                  <div>{formatDate(appeal.createdAt as unknown as Date)}</div>
                </div>
                <div className="text-sm mt-2">
                  <div className="font-medium mb-1">Appeal:</div>
                  <p className="text-gray-300 line-clamp-3">{appeal.text}</p>
                </div>
              </div>
              <div className="p-4 pt-2 border-t border-[#222]">
                {appeal.status === "Pending" ? (
                  <div className="flex gap-2 w-full">
                    <Button
                      className="flex-1 bg-[#222] hover:bg-[#333] text-white"
                      onClick={() => setSelectedAppeal(appeal)}
                    >
                      Review
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-[#222] hover:bg-[#333] text-white"
                    onClick={() => setSelectedAppeal(appeal)}
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Appeal Dialog */}
      <Dialog
        open={!!selectedAppeal}
        onOpenChange={(open) => !open && setSelectedAppeal(null)}
      >
        <DialogContent className="max-w-lg bg-[#222] text-white border-[#333]">
          <DialogHeader>
            <DialogTitle>
              {selectedAppeal?.status === "Pending"
                ? "Review Appeal"
                : "Appeal Details"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedAppeal?.status === "Pending"
                ? "Review this ban appeal and decide whether to approve or reject it."
                : "View the details of this ban appeal."}
            </DialogDescription>
          </DialogHeader>
          {selectedAppeal && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedAppeal.user.avatar}
                    alt={selectedAppeal.user.displayName}
                  />
                  <AvatarFallback className="bg-[#333] text-white">
                    {selectedAppeal.user.displayName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedAppeal.user.displayName}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedAppeal.user.username}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-gray-400">Ban Reason:</div>
                <div>{selectedAppeal.banReason}</div>
                {/* <div className="text-gray-400">Ban Date:</div>
                <div>{selectedAppeal.banDate}</div> */}

                <div className="text-gray-400">Appeal Date:</div>
                <div>{selectedAppeal.createdAt}</div>
              </div>

              <div className="space-y-2">
                <Label>Appeal Message:</Label>
                <div className="p-3 bg-[#333] rounded-md text-sm">
                  {selectedAppeal.text}
                </div>
              </div>

              {/* {selectedAppeal.status === "pending" ? (
                <div className="space-y-2">
                  <Label htmlFor="response">Your Response:</Label>
                  <Textarea
                    id="response"
                    placeholder="Enter your response to this appeal..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={4}
                    className="bg-[#333] border-[#444] text-white"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Admin Response:</Label>
                  <div className="p-3 bg-[#333] rounded-md text-sm">
                    {selectedAppeal.responseText}
                  </div>
                </div>
              )} */}
            </div>
          )}
          <DialogFooter>
            {selectedAppeal?.status === "Pending" ? (
              <>
                <Button
                  className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white"
                  onClick={() => setSelectedAppeal(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={handleReject}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
                  onClick={handleApprove}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            ) : (
              <Button
                className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
                onClick={() => setSelectedAppeal(null)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
