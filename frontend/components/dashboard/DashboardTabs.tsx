'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardTabs = () => {
  const pathname = usePathname();

  const tabs = [
    {
      title: 'Pending Bookings',
      href: '/dashboard/bookings',
    },
    {
      title: 'Upcoming Experiences',
      href: '/dashboard/upcoming',
    },
    {
      title: 'Upcoming Events',
      href: '/dashboard/events',
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex space-x-8 overflow-x-auto py-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive(tab.href)
                  ? 'border-[#0d9488] text-[#0d9488]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardTabs;
