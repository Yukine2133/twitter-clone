import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IAppealCardProps } from "@/interfaces/props.interface";
import { formatDate } from "@/utils/formatTimestamp";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
export const AppealCard = ({
  appeal,
  user,
  setSelectedAppeal,
}: IAppealCardProps) => {
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
              <div className="text-base font-semibold">{user.displayName}</div>
              <div className="text-sm text-gray-400">{user.username}</div>
            </div>
          </div>
          {appeal.status === "Pending" && (
            <span className="inline-flex items-center rounded-full border border-[#333] px-2.5 py-0.5 text-xs font-semibold text-gray-200">
              <ClockIcon className="mr-1 h-3 w-3" />
              Pending
            </span>
          )}
          {appeal.status === "Approved" && (
            <span className="inline-flex items-center rounded-full bg-[#1d9bf0] px-2.5 py-0.5 text-xs font-semibold text-white">
              <CheckIcon className="mr-1 h-3 w-3" />
              Approved
            </span>
          )}
          {appeal.status === "Rejected" && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              <XMarkIcon className="mr-1 h-3 w-3" />
              Rejected
            </span>
          )}
        </div>
      </div>
      <div className="px-4 pb-2">
        <div className="grid grid-cols-2 gap-1 text-sm mb-2">
          <div className="text-gray-400">Ban Reason:</div>
          <div>{appeal.banReason}</div>
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
};
