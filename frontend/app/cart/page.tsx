'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/payments/cart');
    }, [router]);

    return null;
}
