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
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;
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
  whatYouWillLearn?: string[];
  importantInfo?: string[];
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  category?: string;
  location: string;
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;
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
