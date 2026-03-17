'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:3001';

type Booking = {
  id: number;
  guests: number;
  totalPrice: number;
  listing?: {
    title?: string;
    listingType?: string;
    vendor?: { businessName?: string };
  } | null;
  vendor?: { businessName?: string } | null;
  slot?: {
    startTime?: string;
    endTime?: string;
  } | null;
};

type ProductSummaryItem = {
  listingId: number;
  title: string;
  vendorName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

function PaymentSuccessPageContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get('bookingId');
  const bookingId = bookingIdParam ? Number(bookingIdParam) : null;
  const type = searchParams.get('type');
  const plan = searchParams.get('plan');
  const cycle = searchParams.get('cycle');
  const isSubscriptionSuccess =
    type === 'subscription' &&
    (plan === 'user' || plan === 'vendor') &&
    (cycle === 'monthly' || cycle === 'yearly');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionActivated, setSubscriptionActivated] = useState(false);
  const [activationMessage, setActivationMessage] = useState<string | null>(null);
  const [orderCompletionMessage, setOrderCompletionMessage] = useState<string | null>(null);
  const [orderCompletionDone, setOrderCompletionDone] = useState(false);
  const [productSummaryItems, setProductSummaryItems] = useState<ProductSummaryItem[]>([]);
  const hasCompletedOrder = useRef(false);

  useEffect(() => {
    if (isSubscriptionSuccess || !user || !bookingId || Number.isNaN(bookingId)) return;

    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: { 'x-user-id': user.id },
        });
        if (!response.ok) {
          setBooking(null);
          return;
        }
        const data: Booking[] = await response.json();
        const matched = (data ?? []).find((b) => b.id === bookingId) ?? null;
        setBooking(matched);
      } catch (error) {
        console.error('Failed to load booking confirmation details:', error);
        setBooking(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [user, bookingId, isSubscriptionSuccess]);

  useEffect(() => {
    if (!isSubscriptionSuccess || !user || subscriptionActivated) return;

    const activateSubscription = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/subscriptions/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.id,
          },
          body: JSON.stringify({
            plan,
            cycle,
          }),
        });

        if (!response.ok) {
          setActivationMessage('Payment completed, but subscription activation is pending.');
          return;
        }

        setActivationMessage('Your Pro subscription is now active.');
        setSubscriptionActivated(true);
      } catch (error) {
        console.error('Failed to activate subscription:', error);
        setActivationMessage('Payment completed, but subscription activation is pending.');
      } finally {
        setIsLoading(false);
      }
    };

    activateSubscription();
  }, [isSubscriptionSuccess, user, subscriptionActivated, plan, cycle]);

  useEffect(() => {
    if (isSubscriptionSuccess || bookingId || !user || orderCompletionDone) return;
    if (hasCompletedOrder.current) return;
    hasCompletedOrder.current = true;
    console.log('Success page loaded');

    const completeProductOrder = async () => {
      const stored = localStorage.getItem('checkout_items');
      if (!stored) {
        setOrderCompletionDone(true);
        return;
      }

      let storedItems: Array<{
        listingId: number | null;
        quantity: number;
        title: string;
        vendorName: string;
        priceMin: number;
      }> = [];

      try {
        storedItems = JSON.parse(stored);
      } catch {
        setOrderCompletionDone(true);
        return;
      }

      console.log('Cart items:', storedItems);

      const summaryItems = storedItems
        .filter((item) => item.listingId != null)
        .map((item) => ({
          listingId: Number(item.listingId),
          title: item.title ?? 'Product',
          vendorName: item.vendorName ?? 'Vendor',
          quantity: item.quantity ?? 0,
          unitPrice: item.priceMin ?? 0,
          totalPrice: (item.priceMin ?? 0) * (item.quantity ?? 0),
        }));
      setProductSummaryItems(summaryItems);

      const payload = storedItems
        .filter((item) => item.listingId != null)
        .map((item) => ({
          listingId: item.listingId,
          quantity: item.quantity ?? 1,
        }));

      if (payload.length === 0) {
        localStorage.removeItem('checkout_items');
        setOrderCompletionDone(true);
        return;
      }

      setIsLoading(true);
      try {
        console.log('Calling /orders/complete with:', payload);
        const response = await fetch(`${API_BASE}/orders/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.id,
          },
          body: JSON.stringify({
            cartItems: payload,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          setOrderCompletionMessage(text || 'Product purchase finalization failed.');
          return;
        }

        setOrderCompletionMessage('Product purchase finalized successfully.');
        localStorage.removeItem('checkout_items');
      } catch (error) {
        console.error('Failed to complete product order:', error);
        setOrderCompletionMessage('Product purchase finalization failed.');
      } finally {
        setOrderCompletionDone(true);
        setIsLoading(false);
      }
    };

    completeProductOrder();
  }, [isSubscriptionSuccess, bookingId, user, orderCompletionDone]);

  const vendorName = useMemo(
    () => booking?.vendor?.businessName ?? booking?.listing?.vendor?.businessName ?? 'Unknown Vendor',
    [booking],
  );

  const formatTime = (value?: string) => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    const hours = parsed.getUTCHours();
    const minutes = parsed.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formattedSlot = useMemo(() => {
    if (!booking?.slot?.startTime || !booking.slot?.endTime) return '-';
    const start = formatTime(booking.slot.startTime);
    const end = formatTime(booking.slot.endTime);
    if (!start || !end) return '-';
    return `${start} – ${end}`;
  }, [booking]);

  const formattedDate = useMemo(() => {
    if (!booking?.slot?.startTime) return '-';
    const parsed = new Date(booking.slot.startTime);
    if (Number.isNaN(parsed.getTime())) return '-';
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [booking]);

  const subscriptionPrice = isSubscriptionSuccess
    ? (plan === 'vendor'
      ? (cycle === 'yearly' ? 25000 : 2500)
      : (cycle === 'yearly' ? 9000 : 900))
    : 0;
  const subscriptionPlanLabel = plan === 'vendor' ? 'Vendor Pro' : 'User Pro';
  const subscriptionCycleLabel = cycle === 'yearly' ? 'Yearly' : 'Monthly';

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-green-600 text-center mb-2">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            {bookingId
              ? 'Your booking request has been sent to the vendor. You can track its status in Pending Bookings.'
              : 'Your order has been completed.'}
          </p>

          {isLoading ? (
            <p className="text-sm text-gray-600 text-center py-4">
              {isSubscriptionSuccess ? 'Activating subscription…' : 'Loading order summary…'}
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {booking ? 'Booking Details' : 'Order Summary'}
              </h2>
              {isSubscriptionSuccess ? (
                <div className="space-y-0">
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Plan: {subscriptionPlanLabel}</p>
                    <p className="text-sm text-gray-600 mt-1">Billing: {subscriptionCycleLabel}</p>
                  </div>
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Status: {activationMessage ?? 'Subscription activation pending'}</p>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Paid</span>
                    <span className="text-xl font-bold text-[#21a17a]">LKR {subscriptionPrice.toLocaleString()}</span>
                  </div>
                </div>
              ) : booking ? (
                <div className="space-y-0">
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{booking.listing?.title ?? 'Experience'}</p>
                    <p className="text-sm text-gray-600 mt-1">Vendor: {vendorName}</p>
                  </div>
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Date: {formattedDate}</p>
                    <p className="text-sm text-gray-600 mt-1">Time Slot: {formattedSlot}</p>
                    <p className="text-sm text-gray-600 mt-1">Guests: {booking.guests}</p>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Paid</span>
                    <span className="text-xl font-bold text-[#21a17a]">LKR {booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              ) : productSummaryItems.length > 0 ? (
                <div className="space-y-0">
                  {productSummaryItems.map((item) => (
                    <div key={`${item.listingId}`} className="py-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Product: {item.title}</p>
                      <p className="text-sm text-gray-600 mt-1">Vendor: {item.vendorName}</p>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Price: LKR {item.unitPrice.toLocaleString()}
                      </p>
                      <p className="text-sm font-semibold text-[#21a17a] mt-1">
                        Total: LKR {item.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Grand Total</span>
                    <span className="text-xl font-bold text-[#21a17a]">
                      LKR {productSummaryItems.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 py-4">
                  {orderCompletionMessage ?? 'Payment record is confirmed.'}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {bookingId ? (
              <>
                <Link href="/dashboard/bookings">
                  <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                    View Pending Bookings
                  </button>
                </Link>
                <Link href="/marketplace">
                  <button className="w-full rounded-xl border border-[#0d9488] px-5 py-2.5 text-sm font-semibold text-[#0d9488] shadow-sm transition-all hover:bg-[#0d9488]/5 active:scale-[0.98]">
                    Browse Experiences
                  </button>
                </Link>
              </>
            ) : isSubscriptionSuccess ? (
              <Link href="/marketplace">
                <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                  Back to Marketplace
                </button>
              </Link>
            ) : (
              <>
                <Link href="/dashboard/orders">
                  <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                    View Orders
                  </button>
                </Link>
                <Link href="/marketplace">
                  <button className="w-full rounded-xl border border-[#0d9488] px-5 py-2.5 text-sm font-semibold text-[#0d9488] shadow-sm transition-all hover:bg-[#0d9488]/5 active:scale-[0.98]">
                    Continue Shopping
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9fafb] py-12 px-4 flex items-center justify-center"><div className="text-gray-900">Loading...</div></div>}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}