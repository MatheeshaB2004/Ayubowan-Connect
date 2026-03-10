"use client";

import { useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function PostLoginPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || hasChecked.current) return;

    hasChecked.current = true;

    const checkRegistration = async () => {
      try {
        // Force a fresh fetch from Clerk's server to avoid stale metadata
        await user.reload();

        const role = user.unsafeMetadata?.role as string | undefined;

        if (role === "vendor") {
          router.replace("/vendor/dashboard");
        } else if (role === "user") {
          router.replace("/User_profile_manager");
        } else {
          // Not registered - immediately sign out and redirect to register
          await signOut();
          router.replace("/auth/register?error=not_registered");
        }
      } catch {
        router.replace("/auth/login");
      }
    };

    checkRegistration();
  }, [isLoaded, isSignedIn, user, router, signOut]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying your account...</p>
      </div>
    </div>
  );
}
