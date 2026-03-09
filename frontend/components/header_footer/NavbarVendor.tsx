import React from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';

interface NavbarVendorProps {
  textColorClass?: string;
}

const NavbarVendor: React.FC<NavbarVendorProps> = ({ textColorClass = '' }) => {
  const { user } = useUser();

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';
  const displayName = user?.fullName || user?.firstName || 'Vendor';

  return (
    <div className="vendor-nav flex items-center gap-5">
      <Link href="/vendor/dashboard" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Dashboard</Link>
      <Link href="/vendor/listings" className={`nav-link ${textColorClass} ${hoverColorClass}`}>My Listings</Link>
      <Link href="/orders" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Orders</Link>
      <Link href="/vendor/profile" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Business Profile</Link>
      <Link href="/create-listing" className="create-listing-btn">Create Listing</Link>

      <div className="vendor-divider flex items-center gap-3 ml-2">
        <span className={`vendor-name text-sm font-medium hidden lg:block ${textColorClass}`}>{displayName}</span>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavbarVendor;
