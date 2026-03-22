"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, MessageCircleQuestion, MessageCircle, Mail,
  Search, X, Globe, Ticket, ShoppingBag,
  CreditCard, User, MapPin, Wrench,
} from "lucide-react";

// Types
interface FAQItem {
  question: string;
  answer: string;
}
interface FAQCategory {
  category: string;
  icon: React.ReactNode;
  questions: FAQItem[];
}

// Data
const faqData: FAQCategory[] = [
  {
    category: "Getting Started",
    icon: <Globe className="w-4 h-4" />,
    questions: [
      {
        question: "What is Ayubowan Connect?",
        answer: "Ayubowan Connect is an online platform that connects travellers and locals with authentic Sri Lankan cultural experiences, traditional crafts, and events. Vendors — including artisans, chefs, cultural instructors, and tour operators — can list their offerings, while travellers and locals can discover, book, and attend unique Sri Lankan experiences."
      },
      {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button on the homepage. You can sign up as a Traveller (to explore and book experiences) or as a Vendor (to list and manage your offerings). Then you will be asked to provide your name, email address, and a password. After submitting, verify your email address to activate your account."
      },
      {
        question: "How do I log into my account?",
        answer: "Click 'Log In' on the top navigation bar. Enter your registered email address and password, then click 'Sign In'. If you have forgotten your password, click 'Forgot Password?' on the login page."
      },
      {
        question: "What is the difference between a Traveller and a Vendor account?",
        answer: "A Traveller account allows you to browse the marketplace, register for events, make bookings, leave reviews, and manage your personal profile. A Vendor account gives you access to create and manage event listings, marketplace listings, view registrations and bookings, manage your business profile, and receive payouts."
      },
      {
        question: "Do I need an account to browse the platform?",
        answer: "No, you can browse events and marketplace listings as a guest. However, you must create an account and log in to register for events, make bookings, or access your profile and dashboard features."
      },
      {
        question: "Is Ayubowan Connect free to use?",
        answer: "Creating an account and browsing the platform is free for everyone. Travellers pay only when booking a paid experience or event. Vendors can list their offerings — a small platform commission applies to completed bookings."
      },
      {
        question: "What languages does the platform support?",
        answer: "Ayubowan Connect currently operates in English. Support for Sinhala and Tamil is planned for future updates to better serve local users across Sri Lanka."
      },
      {
        question: "How do I reset my forgotten password?",
        answer: "On the login page, click 'Forgot password?'. Enter your registered email address and click Submit. You will receive a password reset link by email. Click the link and follow the instructions to set a new password."
      },
    ]
  },
  {
    category: "Marketplace",
    icon: <ShoppingBag className="w-4 h-4" />,
    questions: [
      {
        question: "What is the difference between Events and the Marketplace?",
        answer: "The Events section is for time-bound cultural experiences — workshops, performances, tours, and meetups that happen on a specific date. The Marketplace is for browsable listings — ongoing experiences or products you can book at your convenience, such as craft items, cooking classes available on multiple dates, or artisan goods."
      },
      {
        question: "How do I search and filter marketplace listings?",
        answer: "Go to the Marketplace page and use the search bar to find listings by name or keyword. Use the filters to narrow results by category, province, district, and price range. Results update in real time."
      },
      {
        question: "How do I book a marketplace listing?",
        answer: "Click on a listing to open its detail page. Select your preferred date and number of guests, then click 'Book Now'. Follow the payment steps to confirm your booking. You will receive a confirmation email shortly after."
      },
      {
        question: "Can I add items to a cart and check out together?",
        answer: "Yes. Click 'Add to Cart' on any listing. You can continue browsing and add more items. When ready, go to your Cart to review everything and complete your purchase in one checkout."
      },
      {
        question: "What types of listings are available on the marketplace?",
        answer: "The marketplace offers two types of listings: Experience listings (such as cooking classes, craft workshops, and cultural tours) and Product listings (such as handmade crafts, traditional Sri Lankan foods, and artisan goods)."
      },
      {
        question: "What is a Pro User account?",
        answer: "A Pro User account is a premium subscription for Travellers that unlocks additional benefits such as priority booking, access to exclusive experiences, and special discounts. You can upgrade to Pro from the Pro section in the main navigation or your Profile settings."
      },
    ]
  },
  {
    category: "Events",
    icon: <Ticket className="w-4 h-4" />,
    questions: [
      {
        question: "How do I find and register for an event?",
        answer: "Go to the Events Calendar page. Browse or search for events, then filter by category, location, or date. Click 'View Details' on any event to see the full description. Click 'Register Now' on the event detail page to secure your spot. You must be logged in as a Traveller to register."
      },
      {
        question: "Can I attend an event as a guest without an account?",
        answer: "No. You must have a registered Traveller account to view event details and register for events. This ensures organisers can plan accurately and that all participants have confirmed their attendance."
      },
      {
        question: "How do I know if an event is fully booked?",
        answer: "The participant count is shown on each event listing, for example '45/50 participants'. When an event is close to full, a warning appears on the event detail page. If it is fully booked, the 'Register Now' button will be disabled."
      },
      {
        question: "What is the cancellation policy for events?",
        answer: "Free cancellation is available up to 24 hours before the event. Cancellations made after this window may not be eligible for a refund. Each event may also have its own policy set by the organiser, which is displayed on the event detail page."
      },
      {
        question: "Where can I see the events I have registered for?",
        answer: "After logging in, go to the Events Calendar page and scroll to the 'Your Registered Events' section. You can also access this from your Profile page."
      },
      {
        question: "What happens if an organiser cancels an event?",
        answer: "If an organiser cancels an event, you will be notified by email and any payments made will be fully refunded within 5–10 business days. The event will be removed from your registered events list."
      },
    ]
  },
  {
    category: "Payments",
    icon: <CreditCard className="w-4 h-4" />,
    questions: [
      {
        question: "What currency are prices shown in?",
        answer: "All prices on Ayubowan Connect are displayed in LKR (Sri Lankan Rupees). International payment cards are accepted — your bank may apply a currency conversion if your card is in a different currency."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept major credit cards and debit cards. All transactions are encrypted and processed securely. Additional payment methods such as online banking may be available depending on your region."
      },
      {
        question: "Is it safe to pay on this platform?",
        answer: "Yes. All payments are processed through a secure, encrypted payment gateway. Ayubowan Connect does not store your card details. Look for the padlock icon in your browser address bar to confirm the connection is secure."
      },
      {
        question: "How do I get a refund?",
        answer: "Refunds depend on the cancellation policy of the event or listing. If you cancel within the free cancellation window (usually 24–48 hours before the event), you will receive a full refund. Refunds are processed within 5–10 business days to your original payment method."
      },
      {
        question: "Will I receive a receipt after payment?",
        answer: "Yes. A booking confirmation and payment receipt will be sent to your registered email address after each successful payment."
      },
    ]
  },
  {
    category: "Account & Profile",
    icon: <User className="w-4 h-4" />,
    questions: [
      {
        question: "How do I update my profile information?",
        answer: "Log in and go to your Profile page from the top navigation. Click 'Edit Profile' to update your name, contact details, and preferences. Save your changes when done."
      },
      {
        question: "How do I view my booking history?",
        answer: "Go to your Profile page and select 'Booking History' to see a complete list of past and upcoming bookings with their status, dates, and amounts paid."
      },
      {
        question: "Can I leave a review after attending an event or booking?",
        answer: "Yes. After completing an event or booking, go to the event or listing detail page, or your booking history in your Profile. You can leave a star rating and written feedback. Reviews are visible to all users."
      },
      {
        question: "How do I delete my account?",
        answer: "Go to your Profile Settings and scroll to the bottom of the page. Click 'Delete Account' and confirm your decision. Account deletion is permanent and cannot be undone. All your data, bookings, and listings will be removed."
      },
      {
        question: "Can I have both a Traveller and a Vendor account?",
        answer: "Currently, each email address is associated with one account type. If you need access to both, please contact our support team for assistance."
      },
    ]
  },
  {
    category: "Sri Lanka Experiences",
    icon: <MapPin className="w-4 h-4" />,
    questions: [
      {
        question: "What kinds of cultural experiences are available?",
        answer: "Ayubowan Connect offers a wide range of authentic Sri Lankan cultural experiences including traditional cooking classes, Kandyan dance performances, batik and handloom fabric making, pottery and clay sculpting, spice garden tours, Ceylon tea tasting sessions, community cultural meetups, wellness and Ayurvedic experiences, and more."
      },
      {
        question: "Are there experiences available outside of Colombo?",
        answer: "Yes. Experiences are available across all nine provinces of Sri Lanka including Kandy (Central), Galle and Matara (Southern), Jaffna (Northern), Nuwara Eliya (Central), Trincomalee (Eastern), Anuradhapura (North Central), and more. Use the location filter to find experiences in your area of interest."
      },
      {
        question: "Are events suitable for tourists visiting Sri Lanka?",
        answer: "Absolutely. Many experiences are designed to give tourists an authentic immersion into Sri Lankan culture. Popular choices include traditional cooking classes, Kandyan dance performances, batik making workshops, Ceylon tea tasting, and spice garden tours. All events on the platform include clear descriptions of what to expect."
      },
      {
        question: "What local foods can I learn to cook?",
        answer: "Cooking experiences cover a wide range of Sri Lankan dishes including rice and curry, hoppers (appa), string hoppers, kottu roti, lamprais, pol sambol, fish ambul thiyal, and traditional sweets such as kavum and kokis — depending on the vendor and event."
      },
      {
        question: "Are experiences suitable for beginners?",
        answer: "Most experiences on the platform are designed to be welcoming to all skill levels including complete beginners. Check the 'Important Information' section and 'What You'll Learn' details on each event listing to confirm suitability before registering."
      },
    ]
  },
  {
    category: "Troubleshooting",
    icon: <Wrench className="w-4 h-4" />,
    questions: [
      {
        question: "Why can't I see the 'Register Now' button on an event?",
        answer: "The 'Register Now' button is only shown to logged-in Traveller accounts. If you are a guest, you will see a 'Sign in to view' prompt. If you are logged in as a Vendor, registration is not available as vendors cannot register for events. Make sure you are signed in with a Traveller account."
      },
      {
        question: "Why is my event not appearing in the public events list?",
        answer: "Your event may be in Draft or Pending Review status. Only Published events are visible to the public. Log in to your Vendor account, go to the Events section, check the status of your event, and publish it."
      },
      {
        question: "Why was my image upload rejected?",
        answer: "Images must be in JPG, PNG, WebP, or GIF format and must not exceed 5MB in size. If your upload was rejected, check that it meets these requirements. You can use a free tool like TinyPNG or Squoosh to reduce file size if needed."
      },
      {
        question: "My payment failed — what should I do?",
        answer: "Check that your card details are entered correctly and that your card has sufficient funds. Ensure your card is enabled for online transactions. Try a different browser or device. If the issue continues, contact your bank or try a different payment method. Our support team is also available to help."
      },
      {
        question: "The page is not loading — what should I do?",
        answer: "Check your internet connection and try refreshing the page. Clear your browser cache and cookies. Try opening the page in a different browser. If the issue persists, contact our support team with details of the page and the problem you are experiencing."
      },
    ]
  },
];

// Component
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openIndex, setOpenIndex]           = useState<number | null>(null);
  const [searchQuery, setSearchQuery]       = useState("");

  const toggleQuestion = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  // Search across all categories
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const results: (FAQItem & { category: string })[] = [];
    faqData.forEach((cat) => {
      cat.questions.forEach((item) => {
        if (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        ) {
          results.push({ ...item, category: cat.category });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const activeQuestions =
    faqData.find((d) => d.category === activeCategory)?.questions ?? [];

  const totalQuestions = faqData.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24">

      {/* ── Hero ── */}
      <div className="relative bg-[#239b7f] text-white py-24 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-0 right-10 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-md border border-white/20 shadow-sm">
              <MessageCircleQuestion className="w-4 h-4" />
              Help Centre
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 mt-2 text-white">
              Frequently Asked Questions
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-10">
              Everything you need to know about Ayubowan Connect. Browse by topic or search for a specific question.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="font-bold text-white text-lg">{faqData.length}</span>
                topics
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="font-bold text-white text-lg">{totalQuestions}</span>
                questions answered
              </div>
            </div>

            {/* Search bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-lochinvar/50 border border-white/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main card ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">

          {/* Search results */}
          {searchResults !== null ? (
            <div className="p-6 sm:p-8 md:p-10">
              {searchResults.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-400 text-lg mb-2">No results found for</p>
                  <p className="text-gray-700 font-semibold text-xl">&ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-gray-400 text-sm mt-3">Try a different keyword or browse the categories below.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-5 text-sm text-lochinvar underline hover:opacity-80"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-gray-500 mb-5">
                    <span className="font-semibold text-gray-800">{searchResults.length}</span> result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                  </p>
                  {searchResults.map((item, i) => (
                    <SearchResultItem key={i} item={item} index={i} openIndex={openIndex} onToggle={toggleQuestion} />
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <>
              {/* Category tabs */}
              <div className="flex overflow-x-auto border-b border-gray-100 px-2 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setOpenIndex(null); }}
                    className={`flex-shrink-0 flex items-center gap-2 py-3.5 px-4 text-sm font-semibold transition-all duration-200 relative whitespace-nowrap rounded-lg mx-0.5
                      ${activeCategory === cat.category
                        ? "text-lochinvar"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/80"
                      }`}
                  >
                    <span className={`${activeCategory === cat.category ? "text-lochinvar" : "text-gray-400"}`}>
                      {cat.icon}
                    </span>
                    {cat.category}
                    {activeCategory === cat.category && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-lochinvar rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Accordion */}
              <div className="p-6 sm:p-8 md:p-10 min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {/* Category description line */}
                    <p className="text-xs text-gray-400 mb-5 uppercase tracking-widest font-medium">
                      {activeCategory} — {activeQuestions.length} questions
                    </p>

                    {activeQuestions.map((q, i) => (
                      <AccordionItem
                        key={i}
                        item={q}
                        index={i}
                        openIndex={openIndex}
                        onToggle={toggleQuestion}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Still have questions */}
                <ContactBlock />
              </div>
            </>
          )}

          {/* If in search mode, still show contact block */}
          {searchResults !== null && searchResults.length >= 0 && (
            <div className="px-6 sm:px-8 md:px-10 pb-10">
              <ContactBlock />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Accordion item
function AccordionItem({
  item, index, openIndex, onToggle,
}: {
  item: FAQItem;
  index: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  const isOpen = openIndex === index;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-xl overflow-hidden transition-all duration-200 bg-white
        ${isOpen
          ? "border-lochinvar/30 shadow-md shadow-black/5"
          : "border-gray-100 hover:border-lochinvar/20 shadow-sm hover:shadow-md hover:shadow-black/5"
        }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lochinvar/20"
      >
        <span className={`font-semibold text-[15px] leading-snug transition-colors ${isOpen ? "text-lochinvar" : "text-gray-900 hover:text-lochinvar"}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-colors ${isOpen ? "bg-lochinvar/10 text-lochinvar" : "bg-gray-50 text-gray-400"}`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="pt-3 border-t border-gray-100 text-[14px] text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Search result item
function SearchResultItem({
  item, index, openIndex, onToggle,
}: {
  item: FAQItem & { category: string };
  index: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  const isOpen = openIndex === index;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`border rounded-xl overflow-hidden transition-all duration-200 bg-white
        ${isOpen ? "border-lochinvar/30 shadow-md shadow-black/5" : "border-gray-100 hover:border-lochinvar/20 shadow-sm"}`}
    >
      {/* Category badge */}
      <div className="px-5 pt-3">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-lochinvar bg-lochinvar/5 border border-lochinvar/20 px-2 py-0.5 rounded-full">
          {item.category}
        </span>
      </div>
      <button
        onClick={() => onToggle(index)}
        className="w-full text-left px-5 py-3 flex items-center justify-between gap-4 focus:outline-none"
      >
        <span className={`font-semibold text-[15px] leading-snug ${isOpen ? "text-lochinvar" : "text-gray-900"}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full ${isOpen ? "bg-lochinvar/10 text-lochinvar" : "bg-gray-50 text-gray-400"}`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="pt-3 border-t border-gray-100 text-[14px] text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Contact block
function ContactBlock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-10 md:mt-14 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8 text-center border border-gray-100"
    >
      <div className="flex justify-center gap-4 mb-5">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("openChatWidget"))}
          title="Open chatbot"
          aria-label="Open chatbot"
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 border border-gray-100 hover:scale-105 transition-transform cursor-pointer hover:shadow-md"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <a
          href="mailto:ayubowanconnect@gmail.com"
          title="Email support"
          aria-label="Email Ayubowan Connect support"
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 border border-gray-100 hover:scale-105 transition-transform cursor-pointer hover:shadow-md"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
        Can&apos;t find the answer you&apos;re looking for? Our friendly support team is here to help.
      </p>
      <a
        href="mailto:ayubowanconnect@gmail.com"
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all shadow-sm hover:shadow-md hover:shadow-teal-600/20 active:scale-95 text-sm"
      >
        Contact Support
      </a>
    </motion.div>
  );
}
