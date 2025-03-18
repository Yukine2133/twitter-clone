import { NoSymbolIcon } from "@heroicons/react/24/solid";

interface BannedUserMessageProps {
  username: string;
  banReason: string;
}

const BannedUserMessage = ({ username, banReason }: BannedUserMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 rounded-full bg-red-900/30 p-5">
        <NoSymbolIcon className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">
        This account has been suspended
      </h2>

      <div className="max-w-md">
        <p className="text-neutral-400 mb-4">
          @{username} has been suspended for violating the Tweeter Rules.
        </p>

        {banReason && (
          <div className="bg-neutral-800/50 rounded-lg p-4 mb-4 border border-neutral-700">
            <p className="text-sm text-neutral-300 font-medium mb-1">
              Reason for suspension:
            </p>
            <p className="text-neutral-400">{banReason}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannedUserMessage;
