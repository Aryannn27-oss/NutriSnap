"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp(email, password, firstName, lastName);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(err.message || "Failed to sign up with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center p-4 md:p-16 text-on-surface antialiased font-body">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl text-primary italic mb-2">NutriSnap</h1>
          <p className="font-body text-lg text-on-surface-variant">Premium Nutrition</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-surface rounded-xl border border-low-contrast p-8 md:p-12">
          <h2 className="font-display text-2xl text-primary mb-8 text-center">Create Account</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-error-container text-error rounded text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-border-low-contrast rounded px-4 py-3 font-body text-base text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-border-low-contrast rounded px-4 py-3 font-body text-base text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-border-low-contrast rounded px-4 py-3 font-body text-base text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-border-low-contrast rounded px-4 py-3 font-body text-base text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                id="password"
                name="password"
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Primary Action */}
            <button
              disabled={loading}
              className="w-full bg-primary text-white font-semibold text-sm rounded py-4 mt-8 hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              type="submit"
            >
              {loading ? "Signing up..." : "Sign Up"}
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                arrow_forward
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-border-low-contrast"></div>
            <span className="px-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-border-low-contrast"></div>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-surface-container-lowest border border-border-low-contrast text-on-surface font-semibold text-sm rounded py-4 hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link className="text-primary font-medium hover:text-secondary transition-colors underline decoration-border-low-contrast underline-offset-4" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
