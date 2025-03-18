"use client";

import type React from "react";

import {
  NoSymbolIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BannedPageContentProps {
  username: string;
  banReason: string;
}

const BannedPageContent = ({ username, banReason }: BannedPageContentProps) => {
  const [isAppealSubmitted, setIsAppealSubmitted] = useState(false);
  const [appealText, setAppealText] = useState("");

  const handleSubmitAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppealSubmitted(true);
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

          {!isAppealSubmitted ? (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Appeal this suspension</h2>
              <p className="text-neutral-400 mb-4">
                If you believe this is a mistake, you can submit an appeal to
                have your account reviewed.
              </p>

              <form onSubmit={handleSubmitAppeal} className="space-y-4">
                <div>
                  <label
                    htmlFor="appeal"
                    className="block text-sm text-neutral-400 mb-2"
                  >
                    Tell us why you think this suspension is incorrect:
                  </label>
                  <ReactTextareaAutosize
                    id="appeal"
                    value={appealText}
                    onChange={(e) => setAppealText(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-md p-3 min-h-[120px] focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Provide details about why you believe your account should be restored..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!appealText.trim()}
                  className="w-full py-3 rounded-full bg-blue-500 font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  Submit Appeal
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-900/20 rounded-lg p-5 mb-6 border border-green-900/30">
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
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
