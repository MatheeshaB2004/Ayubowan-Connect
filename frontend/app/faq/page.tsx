"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion, PhoneCall, Mail } from "lucide-react";

// FAQ Data Structure
const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Ayubowan Connect?",
        answer: "Ayubowan Connect is a platform dedicated to offering authentic Sri Lankan cultural experiences, connecting travelers with local vendors and communities for unforgettable memories."
      },
      {
        question: "How do I create an account?",
        answer: "You can easily create an account by clicking the 'Sign Up' button on the top right corner. We support both standard email registration and quick social logins."
      },
      {
        question: "Is it free to join?",
        answer: "Yes! Joining as a traveler is completely free. You only pay for the specific events or experiences you choose to book."
      }
    ]
  },
  {
    category: "For Vendors",
    questions: [
      {
        question: "How can I become a vendor?",
        answer: "To become a vendor, toggle your view to 'Vendor' mode or register specifically as a vendor on our signup page. Once approved, you can start listing your cultural events."
      },
      {
        question: "What kind of experiences can I host?",
        answer: "We welcome all authentic Sri Lankan cultural experiences, including traditional cooking classes, craft workshops, cultural tours, and heritage site visits."
      },
      {
        question: "How do payouts work?",
        answer: "Payments are processed securely through our platform and are routed to your designated bank account on a bi-weekly basis after the successful completion of an event."
      }
    ]
  },
  {
    category: "Bookings & Cancellations",
    questions: [
      {
        question: "How do I book an experience?",
        answer: "Simply browse our Events page, select an experience you like, choose your date and time if applicable, and click 'Book Now' to secure your spot."
      },
      {
        question: "What is the cancellation policy?",
        answer: "Cancellations made 48 hours before the event will receive a full refund. Cancellations closer to the event date may be subject to a partial fee. Please check the specific event details for exact policies."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeQuestions = faqData.find((d) => d.category === activeCategory)?.questions || [];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24">
      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-0 right-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-800/60 text-teal-50 text-sm font-medium mb-6 backdrop-blur-md border border-teal-700/50 shadow-sm">
              <MessageCircleQuestion className="w-4 h-4" />
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 mt-2 text-white">
              Frequently Asked Questions
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-teal-100/90 leading-relaxed font-medium">
              Have questions? We&apos;re here to help. Find everything you need to know about Ayubowan Connect, booking experiences, and becoming a vendor.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-teal-900/5 border border-gray-100 overflow-hidden">
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-100 px-2 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {faqData.map((category) => (
              <button
                key={category.category}
                onClick={() => {
                  setActiveCategory(category.category);
                  setOpenIndex(null); // reset open question on tab change
                }}
                className={`flex-1 min-w-[160px] py-4 px-6 text-sm md:text-base font-semibold transition-all duration-200 relative whitespace-nowrap
                  ${activeCategory === category.category 
                    ? "text-teal-700" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/80 rounded-lg"
                  }
                `}
              >
                {category.category}
                {activeCategory === category.category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="p-6 sm:p-8 md:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeQuestions.map((q, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 bg-white
                      ${openIndex === i ? 'border-teal-200 shadow-md shadow-teal-900/5' : 'border-gray-100 hover:border-teal-100 shadow-sm hover:shadow-md hover:shadow-teal-900/5'}`}
                  >
                    <button
                      onClick={() => toggleQuestion(i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/20"
                    >
                      <span className={`font-semibold text-base md:text-lg leading-snug transition-colors
                        ${openIndex === i ? 'text-teal-900' : 'text-gray-900 hover:text-teal-700'}
                      `}>
                        {q.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors
                          ${openIndex === i ? 'bg-teal-100 text-teal-700' : 'bg-gray-50 text-gray-400'}
                        `}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-base">
                            <div className="pt-4 border-t border-gray-50">
                              {q.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Still have questions block */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 md:mt-16 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8 text-center border border-gray-100"
            >
              <div className="flex justify-center gap-4 mb-5">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 border border-gray-100 hover:scale-105 transition-transform cursor-pointer hover:shadow-md">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 border border-gray-100 hover:scale-105 transition-transform cursor-pointer hover:shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
              </p>
              <button className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all shadow-sm hover:shadow-md hover:shadow-teal-600/20 active:scale-95">
                Contact Support
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
