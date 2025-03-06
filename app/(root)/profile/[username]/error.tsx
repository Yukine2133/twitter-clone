"use client";

import { useRouter } from "next/navigation";

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl mb-2">Something went wrong!</h2>
      <h3>{error.message}</h3>
      <button className="text-lg mt-4" onClick={() => router.push("/")}>
        Go to HomePage
      </button>
    </div>
  );
};

export default Error;
