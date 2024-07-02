"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="text-lg">
      <ArrowLeftIcon className="size-5" />
    </button>
  );
};

export default GoBackButton;
