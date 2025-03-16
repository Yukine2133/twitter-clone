"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";

export default function SSOCallback() {
  const router = useRouter();
  const { isLoaded, setActive } = useSignIn();

  useEffect(() => {
    if (!isLoaded) return;

    setActive({ session: "current" }).then(() => {
      router.push("/");
    });
  }, [isLoaded, setActive, router]);

  return <p className="text-center mt-10">Redirecting...</p>;
}
