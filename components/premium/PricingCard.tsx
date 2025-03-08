"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";
import { premiumFeatures } from "@/utils/constants";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PricingCard() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loading, setLoading] = useState(false);

  const monthlyPrice = 7;
  const annualPrice = 84;
  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAnnual }),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    if (stripe) await stripe.redirectToCheckout({ sessionId });

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#16181c] overflow-hidden">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full p-1 bg-neutral-800">
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                  isAnnual
                    ? "bg-blue-500 text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Annual
                <span className="ml-1 text-[10px] text-emerald-500">
                  SAVE 12%
                </span>
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                  !isAnnual
                    ? "bg-blue-500 text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-bold">$</span>
              <span className="text-5xl font-bold">
                {isAnnual ? (annualPrice / 12).toFixed(0) : monthlyPrice}
              </span>
              <span className="text-neutral-400 ml-1">/month</span>
            </div>
            {isAnnual && (
              <div className="text-neutral-400 mt-2">
                ${annualPrice} billed annually
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {premiumFeatures.map((feature) => (
            <div key={feature.name} className="flex items-start gap-2">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                <CheckIcon />
              </div>
              <div className="flex items-center gap-1">
                <span>{feature.name}</span>
                {feature.tooltip && (
                  <div className="group relative">
                    <QuestionMarkCircleIcon className="h-4 w-4 text-neutral-500" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-800 rounded-lg text-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-48 text-center">
                      {feature.tooltip}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-8 bg-white text-black rounded-full py-3 font-bold hover:bg-white/90 transition-colors"
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
