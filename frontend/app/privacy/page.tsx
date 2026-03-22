import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Ayubowan Connect',
  description: 'Learn how Ayubowan Connect collects, uses, and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-[var(--light-gray)] dark:bg-[var(--background)]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 text-[var(--lochinvar)]">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            Effective Date: March 21, 2026
          </p>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
              <p>
                Welcome to Ayubowan Connect (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. The Data We Collect About You</h2>
              <p className="mb-3">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[var(--lochinvar)]">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                <li><strong>Profile Data:</strong> includes your username and password, purchases or orders made by you, your interests, preferences, and feedback.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 marker:text-[var(--lochinvar)]">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <p><strong>Email:</strong> ayubowanconnect@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
