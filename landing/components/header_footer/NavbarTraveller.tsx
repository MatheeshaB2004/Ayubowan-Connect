import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

interface NavbarTravellerProps {
  textColorClass?: string;
}

const NavbarTraveller: React.FC<NavbarTravellerProps> = ({ textColorClass = '' }) => {
  const { logout, user } = useAuth();

  const hoverColorClass = textColorClass.includes('white') ? 'hover:text-emerald-400' : 'hover:text-lochinvar';

  return (
    <div className="traveller-nav">
      <Link href="/trips" className={`nav-link ${textColorClass} ${hoverColorClass}`}>My Trips</Link>
      <Link href="/saved" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Saved</Link>
      <Link href="/messages" className={`nav-link ${textColorClass} ${hoverColorClass}`}>Messages</Link>
      
      {/* Divider and User */}
      <div className="traveller-divider">
        <span className={`traveller-name ${textColorClass}`}>Hello, {user?.name}</span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default NavbarTraveller;
