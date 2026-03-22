"use client";

import React, { useState } from 'react';

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate an API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', description: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-28 pb-16 bg-[var(--light-gray)] dark:bg-[var(--background)]">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-10 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2 text-[var(--lochinvar)]">Submit a Complaint</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            We value your feedback. Please let us know if you&rsquo;ve encountered any issues or have a complaint about our services, and our team will get back to you as soon as possible.
          </p>

          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-start">
              <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold">Complaint Submitted</h3>
                <p className="text-sm mt-1">Thank you for letting us know. We have received your complaint and will investigate the matter promptly.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--lochinvar)] focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--lochinvar)] focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--lochinvar)] focus:border-transparent transition-colors appearance-none"
              >
                <option value="" disabled>Select a subject...</option>
                <option value="booking">Booking Issue</option>
                <option value="host">Experience / Host Complaint</option>
                <option value="payment">Payment / Refund</option>
                <option value="technical">Technical Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Complaint Description
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please provide as much detail as possible to help us investigate.
              </p>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--lochinvar)] focus:border-transparent transition-colors resize-y"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-8 py-3 bg-[var(--lochinvar)] hover:bg-[#2d7a6a] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
