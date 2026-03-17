"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  ArrowLeft, Calendar, Clock, Users, MapPin,
  Phone, Mail, Globe, Share2, Heart,
  ChevronLeft, ChevronRight, Star, CheckCircle2,
  Loader2, X,
} from "lucide-react";
import { fetchEventById, registerForEvent } from "../lib/api/events";
import { Event } from "../types/events";
import { formatFullDate, formatPrice } from "../lib/utils";

// Fallback data shown when vendor hasn't provided content
const FALLBACK_LEARN = [
  "Traditional techniques passed down through generations",
  "Cultural significance and history behind the practice",
  "Hands-on practice with expert guidance",
  "Tips and tricks to recreate at home",
  "Certificate of participation",
];
const FALLBACK_INFO = [
  "All materials provided",
  "Suitable for all skill levels",
  "Refreshments included",
  "Photography allowed",
];

interface MockReview { id: number; initials: string; name: string; date: string; rating: number; comment: string; }
const MOCK_REVIEWS: MockReview[] = [
  { id: 1, initials: "LG", name: "Loganathan Ganesh", date: "Feb 15, 2026", rating: 5, comment: "An absolutely incredible experience! The instructor was knowledgeable and patient. I learned so much about our culture and cuisine. Highly recommended!" },
  { id: 2, initials: "MC", name: "Michael Chen",  date: "Feb 10, 2026", rating: 5, comment: "This was the highlight of my trip to Sri Lanka. Authentic, engaging, and so much fun. The small group size made it very personal." },
  { id: 3, initials: "CE", name: "Chathuri Ekanayake",   date: "Jan 21, 2026",  rating: 4, comment: "Great experience overall. The venue was beautiful and activities were well-organised. Would love to come back!" },
];
const MOCK_ATTENDEES = [
  { initials: "RN", name: "Ruqaiyah N.",  country: "Colombo, Sri Lanka" },
  { initials: "MM", name: "Marie M.",  country: "Lyon, France"       },
  { initials: "LM", name: "Lisa M.",  country: "Birmingham, UK"        },
  { initials: "KP", name: "Kaushalya P.", country: "Matale, Sri Lanka"    },
  { initials: "LY", name: "Lingyun Y.",   country: "Guangzhou, China"    },
  { initials: "SR", name: "Shaun R.",  country: "Gampaha, Sri Lanka"   },
];


export default function EventDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();

  // Auth via Clerk
  // useUser() gives us the signed-in user. isLoaded tells us when Clerk is ready.
  const { user, isLoaded: authLoaded } = useUser();

  // get the role from publicMetadata that Clerk stores after sign-up.
  // Adjust the field name to match what our Clerk setup stores.
  const clerkRole = (user?.publicMetadata?.role as string | undefined) ?? "guest";
  const isGuest     = !user;               // not signed in at all
  const isVendor    = clerkRole === "vendor";
  const isTraveller = clerkRole === "traveller" || clerkRole === "user";

  // ALL useState / useCallback hooks declared unconditionally
  const [event, setEvent]       = useState<Event | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved]       = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showReg, setShowReg]       = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError]     = useState<string | null>(null);

  const getToken = () =>
    typeof window !== "undefined" ? (localStorage.getItem("accessToken") ?? "") : "";

  // Redirect guest users after Clerk has loaded
  // do this inside useEffect so hooks are never conditional
  useEffect(() => {
    if (authLoaded && isGuest) {
      router.replace(`/auth/login?redirect=/events/${id}`);
    }
  }, [authLoaded, isGuest, id, router]);

  // Fetch event data
  const loadEvent = useCallback(async () => {
    if (!id) return;
    try {
      const data = await fetchEventById(Number(id));
      setEvent(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadEvent(); }, [loadEvent]);

  // Register handler
  const handleRegister = async () => {
    if (!event) return;
    setRegError(null);
    setRegLoading(true);
    try {
      await registerForEvent(getToken(), event.id);
      setRegSuccess(true);
    } catch {
      setRegError("Registration failed. You may already be registered for this event.");
    } finally {
      setRegLoading(false); }
  };

  // Loading states

  // While Clerk is booting or we're about to redirect a guest, show nothing
  if (!authLoaded || (authLoaded && isGuest)) return null;

  if (loading) return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0d9488] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading event...</p>
      </div>
    </div>
  );

  if (notFound || !event) return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl font-bold text-gray-200 mb-3">404</p>
        <p className="text-gray-500 mb-5">Event not found</p>
        <button onClick={() => router.push("/events")} className="text-sm text-[#0d9488] underline">
          ← Back to Events
        </button>
      </div>
    </div>
  );

  const isFree     = event.isFree || !event.price;
  const spotsLeft  = event.maxParticipants ? event.maxParticipants - event.participantCount : null;
  const almostFull = spotsLeft != null && spotsLeft <= 5;

  const learnItems = (event.whatYouWillLearn && event.whatYouWillLearn.length > 0)
    ? event.whatYouWillLearn : FALLBACK_LEARN;
  const infoItems  = (event.importantInfo && event.importantInfo.length > 0)
    ? event.importantInfo : FALLBACK_INFO;

  const galleryImages = event.imageUrl
    ? [event.imageUrl, event.imageUrl, event.imageUrl, event.imageUrl] : [];

  return (
    <>
      <div className="min-h-screen bg-[#f9fafb]">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 h-12 flex items-center justify-between">
          <button onClick={() => router.push("/events")} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Events
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSaved(s => !s)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${saved ? "text-red-500 hover:bg-red-50" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT — main content */}
            <div className="flex-1 min-w-0">

              {/* Hero */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
                {event.imageUrl
                  ? <Image src={event.imageUrl} alt={event.title} className="w-full h-64 sm:h-80 object-cover" width={1200} height={320} priority />
                  : <div className="w-full h-64 bg-[#e8f5f2] flex items-center justify-center"><Calendar className="w-16 h-16 text-[#0d9488]/30" /></div>
                }
                <div className="absolute top-4 right-4">
                  <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md ${isFree ? "bg-[#0d9488] text-white" : "bg-[#f59e0b] text-white"}`}>
                    {formatPrice(event.price, event.isFree)}
                  </span>
                </div>
                {event.isLive && (
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping inline-block" /> Live Now
                    </span>
                  </div>
                )}
              </div>

              {/* Category + Title + Vendor */}
              {event.category && (
                <span className="inline-block text-xs font-medium text-[#0d9488] border border-[#0d9488]/40 rounded-full px-3 py-1 bg-white mb-3">
                  {event.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-1">{event.title}</h1>
              {event.vendor && <p className="text-[15px] text-[#21a17a] font-semibold mb-5">{event.vendor.businessName}</p>}

              {/* 4-tile meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <MetaTile icon={<Calendar className="w-5 h-5 text-[#0d9488]" />} label="Date">{formatFullDate(event.startDate)}</MetaTile>
                <MetaTile icon={<Clock className="w-5 h-5 text-[#0d9488]" />}    label="Time">{event.time ?? "TBA"}</MetaTile>
                <MetaTile icon={<MapPin className="w-5 h-5 text-[#0d9488]" />}   label="Location">{event.location}</MetaTile>
                <MetaTile icon={<Users className="w-5 h-5 text-[#0d9488]" />}    label="Participants">{event.participantCount}/{event.maxParticipants ?? "∞"}</MetaTile>
              </div>

              {/* About */}
              <Section title="About This Event">
                {event.description
                  ? <div className="space-y-3 text-sm text-gray-700 leading-relaxed"><p>{event.description}</p><p>Experience the authentic flavors and traditions of Sri Lanka in this immersive cultural event. Our expert instructors will guide you through every step, ensuring you gain valuable knowledge and create lasting memories.</p></div>
                  : <p className="text-sm text-gray-500">No description provided.</p>
                }
              </Section>

              {/* What You'll Learn — real vendor data */}
              <Section title="What You'll Learn">
                <ul className="space-y-2.5">
                  {learnItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0d9488] mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                {(!event.whatYouWillLearn || event.whatYouWillLearn.length === 0) && (
                  <p className="text-[11px] text-gray-400 mt-3 italic">Content provided by organiser — specific details may vary.</p>
                )}
              </Section>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <Section title="Event Gallery">
                  <div className="relative rounded-xl overflow-hidden mb-3 h-56 sm:h-72 bg-gray-100">
                    <Image
                      src={galleryImages[galleryIndex]}
                      alt=""
                      className="w-full h-full object-cover"
                      width={1200}
                      height={320}
                      priority
                    />
                    {galleryImages.length > 1 && (
                      <>
                        <button onClick={() => setGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"><ChevronLeft className="w-4 h-4 text-gray-700" /></button>
                        <button onClick={() => setGalleryIndex(i => (i + 1) % galleryImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"><ChevronRight className="w-4 h-4 text-gray-700" /></button>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {galleryImages.map((img, i) => (
                      <button key={i} onClick={() => setGalleryIndex(i)} className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${i === galleryIndex ? "border-[#0d9488]" : "border-transparent"}`}>
                        <Image src={img} alt="" className="w-full h-full object-cover" width={80} height={56} />
                      </button>
                    ))}
                  </div>
                </Section>
              )}

              {/* Reviews */}
              <Section title="Reviews">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-sm font-semibold text-gray-800">4.9</span>
                  <span className="text-sm text-gray-500">(24 reviews)</span>
                </div>
                <div className="space-y-5">
                  {MOCK_REVIEWS.map(r => (
                    <div key={r.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0d9488] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{r.initials}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                          <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />)}</div>
                        </div>
                        <p className="text-[11px] text-gray-400 mb-1">{r.date}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Past Attendees */}
              <Section title="Past Attendees">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOCK_ATTENDEES.map((a, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-[#f9fafb] rounded-xl p-3 border border-gray-100">
                      <div className="w-9 h-9 rounded-full bg-[#0d9488] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{a.initials}</div>
                      <div><p className="text-sm font-medium text-gray-800">{a.name}</p><p className="text-[11px] text-gray-400">{a.country}</p></div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Location */}
              <Section title="Location">
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 h-40 bg-[#e8f5f2] flex flex-col items-center justify-center gap-2">
                  <MapPin className="w-8 h-8 text-[#0d9488]" />
                  <p className="text-sm font-medium text-gray-700">{event.location}</p>
                  <p className="text-xs text-gray-400">Map integration coming soon</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#e8f5f2] flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="w-3 h-3 text-[#0d9488]" /></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">Getting There</p>
                    <p className="text-sm text-gray-500 leading-relaxed">Please contact the vendor for more details regarding transportation options.</p>
                  </div>
                </div>
              </Section>
            </div>

            {/* RIGHT — sticky sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-4">

                {/* Booking card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                  <div className="mb-1">
                    <span className={`text-2xl font-bold ${isFree ? "text-[#0d9488]" : "text-gray-900"}`}>
                      {isFree ? "Free" : formatPrice(event.price, false)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">per person</span>
                  </div>
                  {spotsLeft != null && (
                    <p className={`text-xs mb-4 ${almostFull ? "text-amber-600 font-medium" : "text-gray-500"}`}>
                      {almostFull ? `⚡ Only ${spotsLeft} spots remaining` : `${spotsLeft} spots remaining`}
                    </p>
                  )}
                  <div className="space-y-3 mb-5">
                    <BookingMeta icon={<Calendar className="w-4 h-4 text-[#0d9488]" />} label="Date">{formatFullDate(event.startDate)}</BookingMeta>
                    {event.time && <BookingMeta icon={<Clock className="w-4 h-4 text-[#0d9488]" />} label="Time">{event.time}</BookingMeta>}
                    {event.maxParticipants && <BookingMeta icon={<Users className="w-4 h-4 text-[#0d9488]" />} label="Group Size">Max {event.maxParticipants} participants</BookingMeta>}
                  </div>

                  {isTraveller && (
                    <button onClick={() => setShowReg(true)} className="w-full h-11 rounded-xl bg-[#0d9488] hover:bg-[#0b7a70] text-white font-semibold text-sm transition-colors active:scale-[0.98]">
                      Register Now
                    </button>
                  )}
                  {isVendor && (
                    <div className="w-full h-11 rounded-xl bg-gray-100 text-gray-500 font-medium text-sm flex items-center justify-center">
                      Vendors cannot register
                    </div>
                  )}
                  <p className="text-[11px] text-gray-400 text-center mt-3">Cancellation up to 24 hours before the event</p>
                </div>

                {/* Contact Organiser */}
                {event.vendor && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Organiser</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2.5 text-sm text-gray-600"><Phone className="w-4 h-4 text-[#0d9488] flex-shrink-0" /><span>+94 XX XXX XXXX</span></div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-600"><Mail className="w-4 h-4 text-[#0d9488] flex-shrink-0" /><span>contact@vendor.lk</span></div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-600"><Globe className="w-4 h-4 text-[#0d9488] flex-shrink-0" /><span>www.vendor.lk</span></div>
                    </div>
                    {/* <button className="w-full h-9 rounded-lg border border-[#0d9488] text-[#0d9488] text-sm font-semibold hover:bg-[#0d9488] hover:text-white transition-colors">Send Message</button> */}
                  </div>
                )}

                {/* Important Information — real vendor data */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Information</h3>
                  <ul className="space-y-2">
                    {infoItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  {(!event.importantInfo || event.importantInfo.length === 0) && (
                    <p className="text-[11px] text-gray-400 mt-2 italic">General information provided.</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration modal */}
      {isTraveller && showReg && (
        <RegisterModal
          event={event}
          loading={regLoading}
          success={regSuccess}
          error={regError}
          onConfirm={handleRegister}
          onClose={() => { setShowReg(false); setRegSuccess(false); setRegError(null); }}
        />
      )}
    </>
  );
}

// Registration modal
function RegisterModal({ event, loading, success, error, onConfirm, onClose }: {
  event: Event; loading: boolean; success: boolean; error: string | null; onConfirm: () => void; onClose: () => void;
}) {
  const isFree = event.isFree || !event.price;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Confirm Registration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-5">
          {success ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-3"><CheckCircle2 className="w-8 h-8 text-[#0d9488]" /></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">You&apos;re registered!</h3>
              <p className="text-sm text-gray-500 mb-5">See you at <strong>{event.title}</strong>.</p>
              <button onClick={onClose} className="px-6 h-9 rounded-lg bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0b7a70] transition-colors">Done</button>
            </div>
          ) : (
            <>
              <div className="bg-[#f9fafb] rounded-xl border border-gray-100 p-4 mb-4">
                {event.imageUrl && (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-28 object-cover rounded-lg mb-3"
                    width={400}
                    height={112}
                  />
                )}
                <p className="font-semibold text-gray-900 text-sm mb-1">{event.title}</p>
                {event.vendor && <p className="text-xs text-[#21a17a] font-medium mb-2">{event.vendor.businessName}</p>}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <span>{event.location}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded ${isFree ? "bg-[#0d9488] text-white" : "bg-[#f59e0b] text-white"}`}>{formatPrice(event.price, event.isFree)}</span>
                </div>
              </div>
              {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">{error}</p>}
              <p className="text-xs text-gray-400 mb-4">Free cancellation up to 24 hours before the event.</p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={onConfirm} disabled={loading} className="flex-1 h-10 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Registering...</> : "Confirm Registration"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Shared sub-components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4"><h2 className="text-base font-bold text-gray-900 mb-4">{title}</h2>{children}</div>;
}
function MetaTile({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#f9fafb] rounded-xl border border-gray-100 p-3 flex flex-col items-center text-center gap-1.5">
      {icon}
      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{label}</p>
      <p className="text-xs font-semibold text-gray-800 leading-snug">{children}</p>
    </div>
  );
}
function BookingMeta({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#e8f5f2] flex items-center justify-center flex-shrink-0">{icon}</div>
      <div><p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{label}</p><p className="text-xs font-semibold text-gray-800 mt-0.5">{children}</p></div>
    </div>
  );
}
