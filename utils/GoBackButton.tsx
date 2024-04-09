"use client";

import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="text-lg">
      &#8592;
    </button>
  );
};

export default GoBackButton;
