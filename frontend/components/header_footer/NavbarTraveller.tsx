import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface NavbarTravellerProps {
  textColorClass?: string;
}

const NavbarTraveller: React.FC<NavbarTravellerProps> = ({ textColorClass = '' }) => {
  const { user } = useUser();
  const { cartCount } = useCart();
  const pathname = usePathname();

  const displayName = user?.fullName || user?.firstName || 'Traveller';

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/landing';
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <div className="traveller-nav flex items-center gap-6">
      <Link href="/" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/') ? 'active' : ''}`}>Home</Link>
      <Link href="/marketplace" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/marketplace') ? 'active' : ''}`}>Marketplace</Link>
      <Link href="/events" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/events') ? 'active' : ''}`}>Events</Link>
      <Link href="/dashboard/orders" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
      <Link href="/Itinerary_Planner" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/Itinerary_Planner') ? 'active' : ''}`}>Itinerary Planner</Link>
      <Link href="/pro" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/pro') ? 'active' : ''}`}>Pro</Link>
      <Link href="/faq" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/faq') ? 'active' : ''}`}>FAQs</Link>
      <Link href="/User_profile_manager" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass} ${isActive('/User_profile_manager') ? 'active' : ''}`}>My Profile</Link>

      <div className={`h-6 w-px ${textColorClass.includes('white') ? 'bg-white/30' : 'bg-gray-300'}`}></div>

      <Link href="/payments/cart" className={`relative p-2 rounded-full hover:bg-black/5 transition ${textColorClass}`}>
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
            {cartCount}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="/" />
        <span className={`text-sm font-medium hidden lg:block max-w-[100px] truncate ${textColorClass}`}>
          {displayName}
        </span>
      </div>
    </div>
  );
};

export default NavbarTraveller;
