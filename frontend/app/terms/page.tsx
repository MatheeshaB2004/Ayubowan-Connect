import React from 'react';

export const metadata = {
  title: 'Terms and Conditions | Ayubowan Connect',
  description: 'Terms and Conditions for using Ayubowan Connect services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-[var(--light-gray)] dark:bg-[var(--background)]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 text-[var(--lochinvar)]">Terms and Conditions</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            Last Updated: March 21, 2026
          </p>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
              <p>
                By accessing or using Ayubowan Connect, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. User Accounts</h2>
              <p className="mb-3">When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[var(--lochinvar)]">
                <li>Safeguarding the password that you use to access the service</li>
                <li>Any activities or actions under your password</li>
                <li>Notifying us immediately of any breach of security or unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Content and Conduct</h2>
              <p>
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness. 
              </p>
              <p className="mt-3">
                You agree not to post any content that is offensive, discriminatory, threatening, or otherwise violates the rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive property of Ayubowan Connect and its licensors. The service is protected by copyright, trademark, and other laws of both Sri Lanka and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Limitation of Liability</h2>
              <p>
                In no event shall Ayubowan Connect, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
