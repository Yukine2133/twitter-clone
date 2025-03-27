import React from "react";

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
import { IAppealModalProps } from "@/interfaces/props.interface";
import { Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updateAppeal } from "@/actions/appeal.actions";
import { updateBanStatus } from "@/actions/user.actions";

export const AppealModal = ({
  selectedAppeal,
  setSelectedAppeal,
}: IAppealModalProps) => {
  const handleApprove = async (status: string) => {
    try {
      await updateAppeal(selectedAppeal._id, status);
      await updateBanStatus(selectedAppeal.user.userId, false);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedAppeal(null);
    }
  };

  const handleReject = async (status: string) => {
    try {
      await updateAppeal(selectedAppeal._id, status);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedAppeal(null);
    }
  };
  return (
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
            <div
              className={`p-4 rounded-md text-sm flex items-center gap-3 ${
                selectedAppeal.status === "Approved"
                  ? "bg-[#0c2d48] border border-[#1d9bf0]/30"
                  : "bg-[#3a0a0a] border border-red-500/30"
              }`}
            >
              {selectedAppeal.status === "Approved" ? (
                <>
                  <div className="bg-[#1d9bf0] rounded-full p-1.5 flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Appeal Approved</p>
                    <p className="text-gray-300 mt-1">
                      This user&apos;s ban has been lifted and they can now
                      access their account again.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-red-500 rounded-full p-1.5 flex-shrink-0">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Appeal Rejected</p>
                    <p className="text-gray-300 mt-1">
                      This user&apos;s ban remains in effect.
                    </p>
                  </div>
                </>
              )}
            </div>
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
                onClick={() => handleReject("Rejected")}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
                onClick={() => handleApprove("Approved")}
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
  );
};
