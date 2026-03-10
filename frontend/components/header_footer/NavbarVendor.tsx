import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';

interface NavbarVendorProps {
  textColorClass?: string;
}

const NavbarVendor: React.FC<NavbarVendorProps> = ({ textColorClass = '' }) => {
  const { user } = useUser();
  const pathname = usePathname();

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';
  const displayName = user?.fullName || user?.firstName || 'Vendor';

  // Helper function to check if link is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <div className="vendor-nav flex items-center gap-5">
      <Link href="/vendor/dashboard" className={`nav-link ${textColorClass} ${hoverColorClass} ${isActive('/vendor/dashboard') ? 'active' : ''}`}>Dashboard</Link>
      <Link href="/vendor/listings" className={`nav-link ${textColorClass} ${hoverColorClass} ${isActive('/vendor/listings') ? 'active' : ''}`}>My Listings</Link>
      <Link href="/orders" className={`nav-link ${textColorClass} ${hoverColorClass} ${isActive('/orders') ? 'active' : ''}`}>Orders</Link>
      <Link href="/vendor/profile" className={`nav-link ${textColorClass} ${hoverColorClass} ${isActive('/vendor/profile') ? 'active' : ''}`}>Business Profile</Link>
      <Link href="/create-listing" className="create-listing-btn">Create Listing</Link>

      <div className="vendor-divider flex items-center gap-3 ml-2">
        <span className={`vendor-name text-sm font-medium hidden lg:block ${textColorClass}`}>{displayName}</span>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavbarVendor;
