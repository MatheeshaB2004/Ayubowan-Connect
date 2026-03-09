import React from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface NavbarTravellerProps {
  textColorClass?: string;
}

const NavbarTraveller: React.FC<NavbarTravellerProps> = ({ textColorClass = '' }) => {
  const { user } = useUser();
  const { cartCount } = useCart();

  const displayName = user?.fullName || user?.firstName || 'Traveller';

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/landing' || window.location.pathname === '/')) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/landing#${id}`);
      }
    }
  };

  return (
    <div className="traveller-nav flex items-center gap-6">
      <Link href="/" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass}`}>Home</Link>
      <Link href="/landing#offer" onClick={(e) => handleScroll(e, 'offer')} className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass}`}>Events</Link>
      <Link href="/marketplace" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass}`}>Marketplace</Link>
      <Link href="/pro" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass}`}>Pro</Link>
      <Link href="/trips" className={`nav-link text-sm font-medium ${textColorClass} ${hoverColorClass}`}>My Trips</Link>

      {/* Divider */}
      <div className={`h-6 w-px ${textColorClass.includes('white') ? 'bg-white/30' : 'bg-gray-300'}`}></div>

      {/* Cart Icon */}
      <Link href="/cart" className={`relative p-2 rounded-full hover:bg-black/5 transition ${textColorClass}`}>
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Profile: Clerk UserButton (has profile dashboard + sign out built in) */}
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
