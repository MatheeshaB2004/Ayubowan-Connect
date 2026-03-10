"use client";

import React from "react";
import Link from "next/link";
import "./register.css";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Ayubowan Connect
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          How would you like to use our platform?
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-10 px-6 shadow rounded-xl sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tourist/User Option */}
            <div className="border-2 border-gray-100 rounded-xl p-8 hover:border-teal-500 hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer pb-8">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tourist / Guest</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Discover authentic Sri Lankan experiences, shop local crafts, and connect with artisans.
              </p>
              <Link href="/auth/user-register" className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                Join as Tourist
              </Link>
            </div>

            {/* Vendor Option */}
            <div className="border-2 border-gray-100 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col items-center text-center cursor-pointer pb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Local Vendor</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                Showcase your crafts, offer unique experiences, and connect with global travelers.
              </p>
              <Link href="/auth/vendor-register" className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Join as Vendor
              </Link>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-base text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
