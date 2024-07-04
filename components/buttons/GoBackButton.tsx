"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const GoBackButton = ({ route }: { route?: string }) => {
  const router = useRouter();

  const handleClick = () => {
    route ? router.push(route) : router.back();
  };
  return (
    <button onClick={handleClick} className="text-lg">
      <ArrowLeftIcon className="size-5" />
    </button>
  );
};

export default GoBackButton;
