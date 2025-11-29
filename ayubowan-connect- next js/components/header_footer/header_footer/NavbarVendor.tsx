import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

interface NavbarVendorProps {
  textColorClass?: string;
}

const NavbarVendor: React.FC<NavbarVendorProps> = ({ textColorClass = '' }) => {
  const { logout, user } = useAuth();

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';

  return (
    <div className="vendor-nav">
      <Link href="/dashboard" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Dashboard</Link>
      <Link href="/listings" className={`nav-link ${textColorClass} ${hoverColorClass}`}>My Listings</Link>
      <Link href="/orders" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Orders</Link>
      <Link href="/create-listing" className="create-listing-btn">Create Listing</Link>
      
      <div className="vendor-divider">
         <span className={`vendor-name ${textColorClass}`}>{user?.name}</span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default NavbarVendor;