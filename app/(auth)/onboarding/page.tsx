import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { redirect } from "next/navigation";
import { fetchUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await fetchUser(user.id);

  if (dbUser && dbUser.onboarded) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to Tweeter
        </h1>
        <OnboardingForm dbUser={dbUser} />
      </div>
    </div>
  );
}
