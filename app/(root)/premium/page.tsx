import type { Metadata } from "next";
import PricingCard from "@/components/premium/PricingCard";

export const metadata: Metadata = {
  title: "Premium",
  description: "Subscribe to Tweeter Premium",
};

export default function PremiumPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get verified with Premium</h1>
          <p className="text-neutral-400 text-lg">
            Enjoy an enhanced experience, exclusive creator tools, and top-tier
            verification.
          </p>
        </div>
        <PricingCard />
      </div>
    </div>
  );
}
