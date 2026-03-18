export interface EventVendor {
  id: number;
  businessName: string;
  contactPhone?: string;
  email?: string;
  website?: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  city: string;
  district: string;
  province: string;
  imageUrl?: string;
  category?: string;
  price?: number;
  isFree: boolean;
  maxParticipants?: number;
  participantCount: number;
  isLive?: boolean;
  computedStatus?: "live" | "upcoming" | "past";
  status: "DRAFT" | "PUBLISHED" | "CANCELLED";
  vendor?: EventVendor;
  createdAt?: string;
  updatedAt?: string;

  // Vendor-provided content sections
  whatYouWillLearn?: string[];   // bullet list → "What You'll Learn" section
  importantInfo?: string[];      // bullet list → "Important Information" section
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  category?: string;
  location: string;
  city: string;
  district: string;
  province: string;
  startDate: string;
  endDate?: string;
  time?: string;
  maxParticipants?: number;
  price?: number;
  isFree?: boolean;
  imageUrl?: string;
  whatYouWillLearn?: string[];
  importantInfo?: string[];
}
