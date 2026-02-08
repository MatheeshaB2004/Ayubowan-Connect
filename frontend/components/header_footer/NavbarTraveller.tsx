import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, LogOut } from 'lucide-react';

interface NavbarTravellerProps {
  textColorClass?: string;
}

const NavbarTraveller: React.FC<NavbarTravellerProps> = ({ textColorClass = '' }) => {
  const { logout, user } = useAuth();
  const { cartCount } = useCart();

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

      {/* Profile & Logout */}
      <div className="flex items-center gap-3 group relative cursor-pointer">
        <div className={`flex items-center gap-2 ${textColorClass}`}>
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border border-teal-200">
            {user?.name?.[0]?.toUpperCase() || <User size={16} />}
          </div>
          <span className="text-sm font-medium hidden lg:block max-w-[100px] truncate">{user?.name}</span>
        </div>

        {/* Dropdown for logout */}
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <div className="p-2">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTraveller;
