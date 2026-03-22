"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import "../login.css";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if already signed in
  useEffect(() => {
    if (userLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [userLoaded, isSignedIn, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSafeRedirectPath = (): string | null => {
    const redirect = searchParams.get("redirect");
    if (!redirect) return null;
    // Only allow in-app relative paths to prevent open redirects.
    if (!redirect.startsWith("/")) return null;
    if (redirect.startsWith("//")) return null;
    return redirect;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(getSafeRedirectPath() ?? "/");
      } else {
        setError("Sign in incomplete. Please try again.");
      }
    } catch (err: any) {
      const clerkError = err?.errors?.[0];
      const code = clerkError?.code ?? "";
      const message = clerkError?.message ?? "";
      const accountNotFound =
        code === "form_identifier_not_found" ||
        /couldn['’]t find your account/i.test(message);

      if (accountNotFound) {
        const redirectPath = getSafeRedirectPath();
        const registerUrl = redirectPath
          ? `/auth/register?error=not_registered&redirect=${encodeURIComponent(redirectPath)}`
          : "/auth/register?error=not_registered";
        router.push(registerUrl);
        return;
      }

      const wrongCredentials =
        code === "form_password_incorrect" ||
        /invalid|incorrect|password/i.test(message);

      if (!wrongCredentials) {
        console.log("Unexpected login error:", err);
      }

      setError(wrongCredentials ? "Invalid email or password. Please try again." : (message || "Sign in failed. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">Login to Ayubowan Connect</h1>
        <p className="hero-description">
          Enter your credentials to access authentic Sri Lankan experiences and
          local craftsmanship
        </p>
      </section>

      {/* Login Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-logo flex justify-center">
            <img src="/logo.png" alt="Ayubowan Connect Logo" className="h-24 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div id="clerk-captcha"></div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  suppressHydrationWarning
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  suppressHydrationWarning
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="font-semibold text-teal-600 hover:text-teal-700">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
