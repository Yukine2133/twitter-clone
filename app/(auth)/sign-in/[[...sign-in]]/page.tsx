"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  const handleOAuthSignIn = async (
    provider: "oauth_google" | "oauth_github"
  ) => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("OAuth sign-in error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Logo/Branding */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#02a8f4] p-8">
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/twitter-logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center md:hidden">
              <Image
                src="/twitter-logo-2.png"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center">
              Sign in to Tweeter
            </h1>
            <p className="text-neutral-400 mb-8 text-center">
              See what&apos;s happening in the world right now
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleOAuthSignIn("oauth_google")}
                className="flex items-center justify-center w-full bg-white text-black py-3 px-4 rounded-full font-medium hover:bg-neutral-200 transition-colors"
              >
                <Image
                  src="/google-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </button>

              <button
                onClick={() => handleOAuthSignIn("oauth_github")}
                className="flex items-center justify-center w-full bg-white text-black py-3 px-4 rounded-full font-medium hover:bg-neutral-200 transition-colors"
              >
                <Image
                  src="/github-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with GitHub
              </button>

              <p className="text-center text-neutral-500 text-sm mt-8">
                By signing in, you agree to our Terms, Privacy Policy, and
                Cookie Use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
