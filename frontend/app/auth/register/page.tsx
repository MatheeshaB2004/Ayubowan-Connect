"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "./register.css";

function RoleSelectionContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fbffff] overflow-hidden selection:bg-teal-100 selection:text-teal-900">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {error === "not_registered" && (
          <div className="sm:mx-auto sm:w-full sm:max-w-3xl mb-12 w-full">
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm backdrop-blur-sm">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Registration Required</h3>
                <p className="text-sm text-red-700/90 leading-relaxed">
                  You attempted to sign in, but you don&apos;t have a registered account on Ayubowan Connect yet. Please complete the registration process below to create your account.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-16 w-full max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-1.5 bg-teal-50/80 rounded-full mb-8 border border-teal-100/50 shadow-sm backdrop-blur-sm hover:bg-teal-100/50 transition-colors cursor-default">
            <span className="px-5 py-2 rounded-full bg-white text-sm font-bold tracking-wide text-teal-700 shadow-sm">
              Welcome to Ayubowan Connect
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Community</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium px-4">
            Choose how you want to experience Sri Lanka. Whether you are here to explore or to share your craft, your journey begins here.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 sm:px-8 md:px-0">
          
          {/* Tourist Option */}
          <Link href="/auth/user-register" className="group relative flex flex-col justify-between p-1 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(20,184,166,0.3)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border-2 border-gray-300 hover:border-teal-400">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-8 sm:p-10 lg:p-12 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-teal-50/80 text-teal-600 flex items-center justify-center mb-10 shadow-sm ring-1 ring-teal-100/50 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 ease-out">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-teal-900 transition-colors">
                Tourist <span className="text-gray-400 font-medium group-hover:text-teal-400/60 transition-colors">/ Guest</span>
              </h3>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-12 flex-grow group-hover:text-gray-600 transition-colors">
                Discover authentic Sri Lankan experiences, shop local crafts, and connect with artisans in a meaningful way.
              </p>
              
              <div className="flex items-center text-teal-600 font-bold mt-auto text-lg">
                <span className="relative pb-1">
                  Continue as Tourist
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>

          {/* Vendor Option */}
          <Link href="/auth/vendor-register" className="group relative flex flex-col justify-between p-1 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(20,184,166,0.3)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border-2 border-gray-300 hover:border-teal-400">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-8 sm:p-10 lg:p-12 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-teal-50/80 text-teal-600 flex items-center justify-center mb-10 shadow-sm ring-1 ring-teal-100/50 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 ease-out">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-teal-900 transition-colors">
                Local Vendor
              </h3>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-12 flex-grow group-hover:text-gray-600 transition-colors">
                Showcase your unique crafts, offer local experiences, and connect directly with global travelers.
              </p>
              
              <div className="flex items-center text-teal-600 font-bold mt-auto text-lg">
                <span className="relative pb-1">
                  Continue as Vendor
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>

        </div>

        <div className="mt-16 text-center w-full">
          <p className="text-base font-medium text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="inline-flex items-center font-bold text-teal-600 hover:text-teal-700 transition-colors ml-1 group">
              Sign in here
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    }>
      <RoleSelectionContent />
    </Suspense>
  );
}
