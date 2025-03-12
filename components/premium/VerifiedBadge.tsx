import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface IVerifiedBadgeProps {
  isSubscribed: boolean;
  profileLink?: boolean;
  isOwner?: boolean;
}

export const VerifiedBadge = ({
  isSubscribed,
  profileLink,
  isOwner,
}: IVerifiedBadgeProps) => {
  if (profileLink && !isSubscribed && isOwner) {
    return (
      <Link
        href={`/premium`}
        className="flex items-center gap-1 px-2 py-0.5 bg-[#16181c] rounded-full text-[13px]  hover:bg-[#1d1f23] transition-colors"
      >
        <CheckBadgeIcon className="size-4 text-blue-500" />
        Get verified
      </Link>
    );
  }

  if (isSubscribed) {
    return <CheckBadgeIcon className="size-5 text-blue-500" />;
  }
};
