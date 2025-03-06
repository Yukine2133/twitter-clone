import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/actions/user.actions";

export default async function OnboardingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
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
        <OnboardingForm dbUser={dbUser} userId={user.id} />
      </div>
    </div>
  );
}
