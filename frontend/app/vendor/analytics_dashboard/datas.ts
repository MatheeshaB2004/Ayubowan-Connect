// Dashboard data with period-based variations
export type Period = 'thisMonth' | 'last30Days' | 'lastQuarter';

export interface KPIData {
  totalListings: {value: number;change: number;changeText: string;};
  bookings: {value: number;change: number;};
  profileViews: {value: number;change: number;};
  inquiries: {value: number;change: number;};
  reviews: {value: number;};
  avgRating: {value: number;totalReviews: number;satisfaction: number;};
}

export interface BookingTrendPoint {
  date: string;
  bookings: number;
}

export interface ViewsVsBookingsPoint {
  week: string;
  views: number;
  bookings: number;
}

export interface ListingPerformance {
  name: string;
  bookings: number;
  maxBookings: number;
  tag: 'high' | 'needs-improvement' | 'new';
}

export interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export interface Insight {
  icon: 'calendar' | 'clock' | 'target';
  text: string;
}

export interface GoalData {
  target: number;
  current: number;
  percentage: number;
}

export interface DashboardData {
  kpi: KPIData;
  bookingTrend: BookingTrendPoint[];
  viewsVsBookings: ViewsVsBookingsPoint[];
  conversionRate: number;
  topListings: ListingPerformance[];
  ratingBreakdown: RatingBreakdown[];
  insights: Insight[];
  goal: GoalData;
}

export const dashboardData: Record<Period, DashboardData> = {
  thisMonth: {
    kpi: {
      totalListings: {
        value: 12,
        change: 2,
        changeText: '+2 added this month'
      },
      bookings: { value: 35, change: 15 },
      profileViews: { value: 420, change: 8 },
      inquiries: { value: 18, change: 12 },
      reviews: { value: 28 },
      avgRating: { value: 4.6, totalReviews: 28, satisfaction: 92 }
    },
    bookingTrend: [
    { date: 'Jan 1', bookings: 2 },
    { date: 'Jan 4', bookings: 4 },
    { date: 'Jan 7', bookings: 3 },
    { date: 'Jan 10', bookings: 6 },
    { date: 'Jan 13', bookings: 5 },
    { date: 'Jan 16', bookings: 8 },
    { date: 'Jan 19', bookings: 7 },
    { date: 'Jan 22', bookings: 10 },
    { date: 'Jan 25', bookings: 9 },
    { date: 'Jan 28', bookings: 12 }],

    viewsVsBookings: [
    { week: 'Week 1', views: 85, bookings: 6 },
    { week: 'Week 2', views: 102, bookings: 9 },
    { week: 'Week 3', views: 118, bookings: 10 },
    { week: 'Week 4', views: 115, bookings: 10 }],

    conversionRate: 8.3,
    topListings: [
    {
      name: 'Village Cooking Workshop',
      bookings: 18,
      maxBookings: 18,
      tag: 'high'
    },
    {
      name: 'Traditional Dance Show',
      bookings: 10,
      maxBookings: 18,
      tag: 'high'
    },
    {
      name: 'Batik Workshop',
      bookings: 7,
      maxBookings: 18,
      tag: 'needs-improvement'
    },
    {
      name: 'Tea Plantation Tour',
      bookings: 5,
      maxBookings: 18,
      tag: 'needs-improvement'
    },
    { name: 'Mask Carving Class', bookings: 3, maxBookings: 18, tag: 'new' }],

    ratingBreakdown: [
    { stars: 5, count: 18, percentage: 64 },
    { stars: 4, count: 6, percentage: 21 },
    { stars: 3, count: 3, percentage: 11 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 }],

    insights: [
    { icon: 'calendar', text: 'Most bookings occur on Saturday' },
    { icon: 'clock', text: 'Most inquiries happen between 6PM–9PM' },
    {
      icon: 'target',
      text: '8.3% of profile visitors convert into bookings'
    }],

    goal: { target: 50, current: 35, percentage: 70 }
  },
  last30Days: {
    kpi: {
      totalListings: {
        value: 12,
        change: 3,
        changeText: '+3 added in 30 days'
      },
      bookings: { value: 42, change: 22 },
      profileViews: { value: 510, change: 15 },
      inquiries: { value: 24, change: 18 },
      reviews: { value: 32 },
      avgRating: { value: 4.7, totalReviews: 32, satisfaction: 94 }
    },
    bookingTrend: [
    { date: 'Dec 22', bookings: 3 },
    { date: 'Dec 25', bookings: 5 },
    { date: 'Dec 28', bookings: 4 },
    { date: 'Dec 31', bookings: 7 },
    { date: 'Jan 3', bookings: 6 },
    { date: 'Jan 6', bookings: 9 },
    { date: 'Jan 9', bookings: 8 },
    { date: 'Jan 12', bookings: 11 },
    { date: 'Jan 15', bookings: 10 },
    { date: 'Jan 18', bookings: 14 }],

    viewsVsBookings: [
    { week: 'Week 1', views: 95, bookings: 8 },
    { week: 'Week 2', views: 120, bookings: 11 },
    { week: 'Week 3', views: 140, bookings: 12 },
    { week: 'Week 4', views: 155, bookings: 11 }],

    conversionRate: 8.2,
    topListings: [
    {
      name: 'Village Cooking Workshop',
      bookings: 22,
      maxBookings: 22,
      tag: 'high'
    },
    {
      name: 'Traditional Dance Show',
      bookings: 14,
      maxBookings: 22,
      tag: 'high'
    },
    {
      name: 'Batik Workshop',
      bookings: 9,
      maxBookings: 22,
      tag: 'needs-improvement'
    },
    {
      name: 'Tea Plantation Tour',
      bookings: 6,
      maxBookings: 22,
      tag: 'needs-improvement'
    },
    { name: 'Mask Carving Class', bookings: 4, maxBookings: 22, tag: 'new' }],

    ratingBreakdown: [
    { stars: 5, count: 21, percentage: 66 },
    { stars: 4, count: 7, percentage: 22 },
    { stars: 3, count: 3, percentage: 9 },
    { stars: 2, count: 1, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 }],

    insights: [
    { icon: 'calendar', text: 'Most bookings occur on Saturday & Sunday' },
    { icon: 'clock', text: 'Peak inquiry time: 5PM–8PM' },
    { icon: 'target', text: '8.2% conversion rate from profile views' }],

    goal: { target: 50, current: 42, percentage: 84 }
  },
  lastQuarter: {
    kpi: {
      totalListings: {
        value: 12,
        change: 5,
        changeText: '+5 added this quarter'
      },
      bookings: { value: 128, change: 35 },
      profileViews: { value: 1580, change: 28 },
      inquiries: { value: 72, change: 25 },
      reviews: { value: 45 },
      avgRating: { value: 4.5, totalReviews: 45, satisfaction: 89 }
    },
    bookingTrend: [
    { date: 'Oct', bookings: 28 },
    { date: 'Nov', bookings: 42 },
    { date: 'Dec', bookings: 58 }],

    viewsVsBookings: [
    { week: 'October', views: 420, bookings: 28 },
    { week: 'November', views: 520, bookings: 42 },
    { week: 'December', views: 640, bookings: 58 }],

    conversionRate: 8.1,
    topListings: [
    {
      name: 'Village Cooking Workshop',
      bookings: 52,
      maxBookings: 52,
      tag: 'high'
    },
    {
      name: 'Traditional Dance Show',
      bookings: 38,
      maxBookings: 52,
      tag: 'high'
    },
    {
      name: 'Batik Workshop',
      bookings: 22,
      maxBookings: 52,
      tag: 'needs-improvement'
    },
    {
      name: 'Tea Plantation Tour',
      bookings: 16,
      maxBookings: 52,
      tag: 'needs-improvement'
    },
    { name: 'Mask Carving Class', bookings: 8, maxBookings: 52, tag: 'new' }],

    ratingBreakdown: [
    { stars: 5, count: 28, percentage: 62 },
    { stars: 4, count: 10, percentage: 22 },
    { stars: 3, count: 5, percentage: 11 },
    { stars: 2, count: 2, percentage: 5 },
    { stars: 1, count: 0, percentage: 0 }],

    insights: [
    { icon: 'calendar', text: 'December was your best month!' },
    { icon: 'clock', text: 'Weekends drive 65% of bookings' },
    { icon: 'target', text: '8.1% average conversion rate' }],

    goal: { target: 150, current: 128, percentage: 85 }
  }
};

export const periodLabels: Record<Period, string> = {
  thisMonth: 'This Month',
  last30Days: 'Last 30 Days',
  lastQuarter: 'Last Quarter'
};