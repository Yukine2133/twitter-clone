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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, Clock, X } from "lucide-react";

// Mock data for ban appeals
const appeals = [
  {
    id: "1",
    user: {
      id: "101",
      name: "John Doe",
      username: "@johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "Community Guidelines Violation",
    banDate: "Mar 15, 2023",
    duration: "30 Days",
    appealDate: "Mar 18, 2023",
    status: "pending",
    appealText:
      "I believe this ban was a mistake. I did not violate any community guidelines and would like to appeal this decision. I've been a member for over 2 years with no prior issues.",
  },
  {
    id: "2",
    user: {
      id: "102",
      name: "Jane Smith",
      username: "@janesmith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "Harassment",
    banDate: "Mar 10, 2023",
    duration: "7 Days",
    appealDate: "Mar 12, 2023",
    status: "pending",
    appealText:
      "I was having a heated discussion but did not harass anyone. I apologize if my words were misinterpreted and promise to be more careful with my language in the future.",
  },
  {
    id: "3",
    user: {
      id: "103",
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "Spam",
    banDate: "Mar 5, 2023",
    duration: "Permanent",
    appealDate: "Mar 8, 2023",
    status: "rejected",
    appealText:
      "I was not spamming. I was sharing my content which I believe is valuable to the community. Please reconsider this ban as this platform is important to me.",
    responseText:
      "After reviewing your account activity, we found multiple instances of posting the same content across numerous threads in a short timeframe, which violates our spam policy.",
  },
  {
    id: "4",
    user: {
      id: "104",
      name: "Sam Wilson",
      username: "@samwilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "Impersonation",
    banDate: "Feb 28, 2023",
    duration: "Permanent",
    appealDate: "Mar 2, 2023",
    status: "approved",
    appealText:
      "This is my real account. I can provide verification of my identity. There seems to be a misunderstanding.",
    responseText:
      "We've verified your identity and have lifted the ban. We apologize for the inconvenience.",
  },
];

export function BanAppeals() {
  const [filter, setFilter] = useState("all");
  const [selectedAppeal, setSelectedAppeal] = useState<any>(null);
  const [responseText, setResponseText] = useState("");

  const filteredAppeals =
    filter === "all"
      ? appeals
      : appeals.filter((appeal) => appeal.status === filter);

  const handleApprove = () => {
    // In a real app, you would call an API to update the appeal status
    console.log("Approving appeal", selectedAppeal.id, responseText);
    setSelectedAppeal(null);
    setResponseText("");
  };

  const handleReject = () => {
    // In a real app, you would call an API to update the appeal status
    console.log("Rejecting appeal", selectedAppeal.id, responseText);
    setSelectedAppeal(null);
    setResponseText("");
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
              value="all"
              className="focus:bg-[#444] focus:text-white"
            >
              All Appeals
            </SelectItem>
            <SelectItem
              value="pending"
              className="focus:bg-[#444] focus:text-white"
            >
              Pending
            </SelectItem>
            <SelectItem
              value="approved"
              className="focus:bg-[#444] focus:text-white"
            >
              Approved
            </SelectItem>
            <SelectItem
              value="rejected"
              className="focus:bg-[#444] focus:text-white"
            >
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredAppeals.map((appeal) => (
          <div
            key={appeal.id}
            className="bg-[#111] border border-[#222] rounded-lg overflow-hidden"
          >
            <div className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={appeal.user.avatar}
                      alt={appeal.user.name}
                    />
                    <AvatarFallback className="bg-[#333] text-white">
                      {appeal.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-base font-semibold">
                      {appeal.user.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {appeal.user.username}
                    </div>
                  </div>
                </div>
                {appeal.status === "pending" && (
                  <span className="inline-flex items-center rounded-full border border-[#333] px-2.5 py-0.5 text-xs font-semibold text-gray-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </span>
                )}
                {appeal.status === "approved" && (
                  <span className="inline-flex items-center rounded-full bg-[#1d9bf0] px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Check className="mr-1 h-3 w-3" />
                    Approved
                  </span>
                )}
                {appeal.status === "rejected" && (
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
                <div>{appeal.reason}</div>
                <div className="text-gray-400">Ban Date:</div>
                <div>{appeal.banDate}</div>
                <div className="text-gray-400">Duration:</div>
                <div>{appeal.duration}</div>
                <div className="text-gray-400">Appeal Date:</div>
                <div>{appeal.appealDate}</div>
              </div>
              <div className="text-sm mt-2">
                <div className="font-medium mb-1">Appeal:</div>
                <p className="text-gray-300 line-clamp-3">
                  {appeal.appealText}
                </p>
              </div>
              {appeal.responseText && (
                <div className="text-sm mt-2 p-2 bg-[#222] rounded-md">
                  <div className="font-medium mb-1">Response:</div>
                  <p className="text-gray-300">{appeal.responseText}</p>
                </div>
              )}
            </div>
            <div className="p-4 pt-2 border-t border-[#222]">
              {appeal.status === "pending" ? (
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
        ))}
      </div>

      {/* Review Appeal Dialog */}
      <Dialog
        open={!!selectedAppeal}
        onOpenChange={(open) => !open && setSelectedAppeal(null)}
      >
        <DialogContent className="max-w-md bg-[#222] text-white border-[#333]">
          <DialogHeader>
            <DialogTitle>
              {selectedAppeal?.status === "pending"
                ? "Review Appeal"
                : "Appeal Details"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedAppeal?.status === "pending"
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
                    alt={selectedAppeal.user.name}
                  />
                  <AvatarFallback className="bg-[#333] text-white">
                    {selectedAppeal.user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedAppeal.user.name}</div>
                  <div className="text-sm text-gray-400">
                    {selectedAppeal.user.username}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-gray-400">Ban Reason:</div>
                <div>{selectedAppeal.reason}</div>
                <div className="text-gray-400">Ban Date:</div>
                <div>{selectedAppeal.banDate}</div>
                <div className="text-gray-400">Duration:</div>
                <div>{selectedAppeal.duration}</div>
                <div className="text-gray-400">Appeal Date:</div>
                <div>{selectedAppeal.appealDate}</div>
              </div>

              <div className="space-y-2">
                <Label>Appeal Message:</Label>
                <div className="p-3 bg-[#333] rounded-md text-sm">
                  {selectedAppeal.appealText}
                </div>
              </div>

              {selectedAppeal.status === "pending" ? (
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
              )}
            </div>
          )}
          <DialogFooter>
            {selectedAppeal?.status === "pending" ? (
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
