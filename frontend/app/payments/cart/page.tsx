'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart, CartItem } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const productItems = items.filter((item) => {
    const listing = item.listing ?? item.booking?.listing;
    return item.bookingId == null && listing?.listingType !== 'EXPERIENCE';
  });

  const totalAmount = productItems.reduce(
    (sum, item) => {
      const listing = item.listing ?? item.booking?.listing;
      const price = listing?.priceMin ?? 0;
      const guests = item.booking?.guests ?? item.quantity ?? 1;
      return sum + guests * price;
    },
    0
  );

  // Group items by vendor
  const groupedByVendor: Record<string, CartItem[]> = {};
  productItems.forEach((item) => {
    const listing = item.listing ?? item.booking?.listing;
    const vendorName = listing?.vendor?.businessName ?? 'Vendor';
    if (!groupedByVendor[vendorName]) {
      groupedByVendor[vendorName] = [];
    }

    groupedByVendor[vendorName].push(item);
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Continue Shopping */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-green-700 mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Continue Shopping
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Your Cart</h1>

        {productItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
            {/* Shopping bag icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Browse experiences and products to add them to your cart.
            </p>

            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* ── Cart Items Grouped by Vendor ── */}
            {Object.entries(groupedByVendor).map(([vendorName, vendorItems]) => (
              <div key={vendorName} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">

                {/* Vendor Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 text-sm font-bold">{vendorName.charAt(0)}</span>
                  </div>
                  <h2 className="text-base font-semibold text-gray-800">{vendorName}</h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {vendorItems.map((item) => {
                    const listing = item.listing ?? item.booking?.listing;
                    const imageUrl =
                      listing?.media?.[0]?.mediaUrl ||
                      '/assets/photos/B4.webp';
                    const title = listing?.title ?? 'Unknown Item';
                    const price = listing?.priceMin ?? 0;
                    const listingType = listing?.listingType ?? 'PRODUCT';
                    const vendorNameForItem =
                      listing?.vendor?.businessName ?? 'Vendor';

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-5 first:pt-0 last:pb-0"
                      >
                        {/* Image */}
                        <div className="flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={imageUrl}
                            alt={title}
                            width={110}
                            height={80}
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 truncate">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {vendorNameForItem}
                          </p>

                          <div className="flex items-center gap-3 mt-2">
                            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${listingType === 'EXPERIENCE'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-green-50 text-green-700'
                              }`}>
                              {listingType === 'EXPERIENCE' ? 'Experience' : 'Product'}
                            </span>

                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>

                          <p className="text-base font-bold text-[#21a17a] mt-2">
                            LKR {(price * (item.booking?.guests ?? item.quantity)).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg px-3 py-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* ── Total Section ── */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Total Amount</h2>
              <div className="flex justify-between items-center py-4 border-y border-gray-100 mb-4">
                <span className="text-sm text-gray-600">Cart total</span>
                <span className="text-xl font-bold text-[#21a17a]">
                  LKR {totalAmount.toLocaleString()}
                </span>
              </div>

              <Link href="/payments/checkout">
                <button className="w-full rounded-xl bg-[#0d9488] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}