"use client";

import type React from "react";

import {
  NoSymbolIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IBannedPageContentProps } from "@/interfaces/props.interface";
import { addAppeal } from "@/actions/appeal.actions";
import { Check, XCircleIcon } from "lucide-react";
import { BannedPageAppealForm } from "./BannedPageAppealForm";

const BannedPageContent = ({
  username,
  banReason,
  userId,
  isAppealSubmitted: initialAppealState,
  rejectedAppeal,
}: IBannedPageContentProps) => {
  const [isAppealSubmitted, setIsAppealSubmitted] =
    useState(initialAppealState);
  const [appealText, setAppealText] = useState("");

  const handleSubmitAppeal = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!appealText) return;

      await addAppeal({
        user: userId,
        banReason,
        text: appealText,
      });
    } catch (error) {
    } finally {
      setIsAppealSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 ">
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/twitter-logo-2.png"
          alt="Twitter Logo"
          width={40}
          height={40}
          className="text-blue-500"
        />
      </div>

      <div className="bg-black border border-neutral-800 rounded-xl overflow-hidden">
        <div className="bg-red-900/20 p-6 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-900/30 p-3">
              <NoSymbolIcon className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="text-xl font-bold">Account Suspended</h1>
          </div>
        </div>

        <div className="p-6">
          <p className="text-lg mb-6">
            @{username}, your account has been suspended permanently for
            violating the Tweeter Rules.
          </p>

          <div className="bg-neutral-900 rounded-lg p-5 mb-6 border border-neutral-800">
            <h2 className="text-lg font-bold mb-3">Reason for suspension:</h2>
            <p className="text-neutral-300">{banReason}</p>
          </div>

          {!isAppealSubmitted && (
            <BannedPageAppealForm
              handleSubmitAppeal={handleSubmitAppeal}
              appealText={appealText}
              setAppealText={setAppealText}
            />
          )}

          {isAppealSubmitted && !rejectedAppeal && (
            <div className="bg-green-900/20 rounded-lg p-5 mb-6 border border-green-900/30">
              <div className="flex items-start gap-3">
                <Check className="size-5 text-green-500 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold mb-1">Appeal Submitted</h2>
                  <p className="text-neutral-300">
                    We&apos;ve received your appeal and will review it as soon
                    as possible. We&apos;ll notify you of our decision.
                  </p>
                </div>
              </div>
            </div>
          )}

          {rejectedAppeal && (
            <div className="bg-red-900/20 rounded-lg p-5 mb-6 border border-red-900/30">
              <div className="flex items-start gap-3">
                <XCircleIcon className="size-5 text-red-500 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold mb-1">Appeal Rejected</h2>
                  <p className="text-neutral-300">
                    Your appeal has been rejected.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-neutral-900/50 rounded-lg p-5 border border-neutral-800">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold mb-1">Learn More</h2>
                <p className="text-neutral-400 mb-3">
                  To ensure a safe environment for users, Tweeter suspends
                  accounts that violate the Twitter Rules.
                </p>
                <Link href="/rules" className="text-blue-500 hover:underline">
                  Read the Tweeter Rules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannedPageContent;
