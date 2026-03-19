'use client';

import Link from 'next/link';

const cards = [
  {
    title: 'My Pending Bookings',
    description: 'Track booking requests waiting for vendor approval',
    href: '/dashboard/bookings',
    icon: (
      <svg className="h-8 w-8 text-[#0d9488]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'My Events',
    description: 'View events you have registered for',
    href: '/dashboard/events',
    icon: (
      <svg className="h-8 w-8 text-[#0d9488]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15zm0 2.25h.008v.008H16.5v-.008z" />
      </svg>
    ),
  },
  {
    title: 'My Orders',
    description: 'View completed purchases',
    href: '/dashboard/orders',
    icon: (
      <svg className="h-8 w-8 text-[#0d9488]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Customer Dashboard
        </h1>
        <p className="text-gray-500 mb-10">
          Manage your bookings and orders in one place.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-start gap-4 transition-shadow hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0d9488]/10">
                {card.icon}
              </div>

              {/* Text */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {card.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Button */}
              <Link href={card.href} className="mt-auto">
                <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                  View
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
