'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center'
    }}>
      <CheckCircle size={64} color="#0d9488" />
      <h1>Payment Successful</h1>
      <p>Your booking has been placed successfully.</p>
      <Link href="/marketplace" style={{ color: '#0d9488', fontWeight: 600 }}>
        Back to Marketplace
      </Link>
    </div>
  );
}