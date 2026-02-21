export interface Event {
  id: number;
  title: string;
  description?: string | null;
  startDate: string; // ISO string
  endDate?: string | null;
  location: string;
  city: string;
  district: string;
  province: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location: string;
  city: string;
  district: string;
  province: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
}