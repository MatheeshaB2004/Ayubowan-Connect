import { ListingType, PrismaClient, VisibilityStatus } from '@prisma/client';

const prisma = new PrismaClient();

const provinceByDistrict: Record<string, string> = {
  Kandy: 'Central',
  Matale: 'Central',
  'Nuwara Eliya': 'Central',
  Badulla: 'Uva',
  Galle: 'Southern',
  Matara: 'Southern',
  Hambantota: 'Southern',
  Colombo: 'Western',
  Ampara: 'Eastern',
  Jaffna: 'Northern',
  Kurunegala: 'North Western',
};

// Coordinates for major Sri Lankan cities
const coordinatesByCity: Record<string, { lat: number; lng: number }> = {
  Kandy: { lat: 7.2906, lng: 80.6337 },
  Sigiriya: { lat: 7.9570, lng: 80.7603 },
  Colombo: { lat: 6.9271, lng: 79.8612 },
  Galle: { lat: 6.0535, lng: 80.2210 },
  Mirissa: { lat: 5.9467, lng: 80.4564 },
  Negombo: { lat: 7.2088, lng: 79.8358 },
  'Nuwara Eliya': { lat: 6.9497, lng: 80.7891 },
  Ella: { lat: 6.8667, lng: 81.0461 },
  Anuradhapura: { lat: 8.3114, lng: 80.4037 },
  Polonnaruwa: { lat: 7.9403, lng: 81.0188 },
  Trincomalee: { lat: 8.5874, lng: 81.2152 },
  Matale: { lat: 7.4675, lng: 80.6234 },
  Bentota: { lat: 6.4260, lng: 79.9957 },
  Arugam: { lat: 6.8408, lng: 81.8369 },
  Dambulla: { lat: 7.8731, lng: 80.6514 },
  Tangalle: { lat: 6.0243, lng: 80.7968 },
  Yala: { lat: 6.3724, lng: 81.5198 },
  Jaffna: { lat: 9.6615, lng: 80.0255 },
  Hikkaduwa: { lat: 6.1408, lng: 80.1033 },
  Unawatuna: { lat: 6.0105, lng: 80.2497 },
};

const listingSeed = [
  {
    id: 1,
    title: 'Traditional Kandyan Dance',
    shortDescription: 'Experience the rhythmic heartbeat of Sri Lanka.',
    longDescription:
      'Witness the legendary Kandyan dancers in a spectacular showcase of traditional Sri Lankan culture. The performance features the Getabera drum, fire walking, and acrobatic movements that have been performed for kings for centuries.',
    priceMin: 2500,
    location: { city: 'Kandy', district: 'Kandy' },
    ratingAverage: 4.8,
    ratingCount: 124,
    category: 'Culture',
    listingType: ListingType.EXPERIENCE,
    tags: ['Culture', 'Dance', 'Music'],
    inclusions: [
      { title: 'Live Drumming', description: 'Enjoy the powerful beats of traditional drums.' },
      { title: 'Cultural Context', description: 'Learn the stories behind each performance.' },
      { title: 'Photo Session', description: 'Take photos with the dancers in full costume.' },
    ],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 2,
    title: 'Sigiriya Rock Fortress Tour',
    shortDescription: 'Climb the Lion Rock and discover the ancient palace.',
    longDescription:
      'Ascend the UNESCO World Heritage site of Sigiriya. Explore the ancient water gardens, see the world-famous frescoes, and marvel at the mirror wall.',
    priceMin: 4500,
    location: { city: 'Sigiriya', district: 'Matale' },
    ratingAverage: 4.9,
    ratingCount: 312,
    category: 'Culture',
    listingType: ListingType.EXPERIENCE,
    tags: ['History', 'Nature', 'Adventure'],
    inclusions: [
      { title: 'Expert Guide', description: 'Certified archaeologist guide.' },
      { title: 'Morning Start', description: 'Beat the heat with an early climb.' },
      { title: 'Scenic Views', description: 'Panoramic views from the summit.' },
    ],
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 3,
    title: 'Ella Train Journey',
    shortDescription: 'Ride the hill-country train through tea country.',
    longDescription:
      "Travel through Sri Lanka's hill country, crossing the Nine Arches Bridge and rolling tea estates. A scenic, nostalgic journey with breathtaking views.",
    priceMin: 1200,
    location: { city: 'Ella', district: 'Badulla' },
    ratingAverage: 4.7,
    ratingCount: 89,
    category: 'Nature',
    listingType: ListingType.EXPERIENCE,
    tags: ['Nature', 'Scenic', 'Travel'],
    inclusions: [
      { title: 'Photo Ops', description: 'Stops at key scenic points.' },
      { title: 'Reserved Seating', description: 'Guaranteed window seats.' },
      { title: 'Tea & Snacks', description: 'Traditional snacks served on board.' },
    ],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 4,
    title: 'Galle Fort Walk',
    shortDescription: 'A coastal walk through history.',
    priceMin: 0,
    location: { city: 'Galle', district: 'Galle' },
    ratingAverage: 4.6,
    ratingCount: 52,
    category: 'Culture',
    listingType: ListingType.EXPERIENCE,
    tags: ['Culture', 'History'],
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 5,
    title: 'Spicy Street Food Tour',
    shortDescription: "Taste Colombo's street flavors.",
    priceMin: 3000,
    location: { city: 'Colombo', district: 'Colombo' },
    ratingAverage: 4.5,
    ratingCount: 41,
    category: 'Food',
    listingType: ListingType.EXPERIENCE,
    tags: ['Food', 'Street'],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 6,
    title: 'Tea Plantation Visit',
    shortDescription: 'Explore the tea estates of the central highlands.',
    longDescription:
      "Walk the paths of Sri Lanka's tea country, learn how leaves become the tea you drink, and share a meal prepared by local families.",
    priceMin: 2000,
    location: { city: 'Nuwara Eliya', district: 'Nuwara Eliya' },
    ratingAverage: 4.9,
    ratingCount: 47,
    category: 'Nature',
    listingType: ListingType.EXPERIENCE,
    tags: ['Culture', 'Nature', 'Food'],
    inclusions: [
      {
        title: 'Guided plantation walk',
        description: 'A local guide leads you through the terraced fields.',
      },
      {
        title: 'Traditional lunch',
        description: 'Homemade meals prepared by the family.',
      },
      {
        title: 'Tea tasting',
        description: 'Learn how leaves become tea from harvest to cup.',
      },
    ],
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 7,
    title: 'Whale Watching in Mirissa',
    shortDescription: 'Sail out for giant blue whales.',
    priceMin: 6000,
    location: { city: 'Mirissa', district: 'Matara' },
    ratingAverage: 4.8,
    ratingCount: 73,
    category: 'Wildlife',
    listingType: ListingType.EXPERIENCE,
    tags: ['Wildlife', 'Ocean'],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 8,
    title: 'Yala National Park Safari',
    shortDescription: "Jeep safari in Sri Lanka's wildlife heart.",
    priceMin: 8500,
    location: { city: 'Yala', district: 'Hambantota' },
    ratingAverage: 4.9,
    ratingCount: 88,
    category: 'Wildlife',
    listingType: ListingType.EXPERIENCE,
    tags: ['Wildlife', 'Safari'],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 9,
    title: 'Traditional Mask Carving',
    shortDescription: 'Hand carved masks from Ambalangoda.',
    priceMin: 1500,
    location: { city: 'Ambalangoda', district: 'Galle' },
    ratingAverage: 4.7,
    ratingCount: 28,
    category: 'Culture',
    listingType: ListingType.PRODUCT,
    tags: ['Craft', 'Culture'],
    specs: {
      composition: 'Lightweight Alstonia wood, hand-carved and painted.',
      dimensions: 'Approx 30cm x 20cm.',
      care: 'Keep dry and avoid direct sunlight for long periods.',
    },
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 10,
    title: 'Colombo City Tour by Tuk Tuk',
    shortDescription: 'See the capital in a tuk tuk.',
    priceMin: 2500,
    location: { city: 'Colombo', district: 'Colombo' },
    ratingAverage: 4.6,
    ratingCount: 65,
    category: 'Culture',
    listingType: ListingType.EXPERIENCE,
    tags: ['City', 'Culture'],
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 11,
    title: 'Surfing Lesson in Arugam Bay',
    shortDescription: 'Beginner-friendly surf session.',
    priceMin: 3500,
    location: { city: 'Arugam Bay', district: 'Ampara' },
    ratingAverage: 4.8,
    ratingCount: 39,
    category: 'Adventure',
    listingType: ListingType.EXPERIENCE,
    tags: ['Adventure', 'Surfing'],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 12,
    title: 'Cooking Class with Local Family',
    shortDescription: 'Home cooked Sri Lankan dishes.',
    priceMin: 2800,
    location: { city: 'Kandy', district: 'Kandy' },
    ratingAverage: 4.9,
    ratingCount: 58,
    category: 'Food',
    listingType: ListingType.EXPERIENCE,
    tags: ['Food', 'Culture'],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 13,
    title: 'Horton Plains Trek',
    shortDescription: "Hike to World's End.",
    priceMin: 4000,
    location: { city: 'Nuwara Eliya', district: 'Nuwara Eliya' },
    ratingAverage: 4.7,
    ratingCount: 44,
    category: 'Adventure',
    listingType: ListingType.EXPERIENCE,
    tags: ['Adventure', 'Nature'],
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 14,
    title: 'Temple of the Tooth Visit',
    shortDescription: 'Sacred temple experience.',
    priceMin: 1000,
    location: { city: 'Kandy', district: 'Kandy' },
    ratingAverage: 4.8,
    ratingCount: 77,
    category: 'Culture',
    listingType: ListingType.EXPERIENCE,
    tags: ['Culture', 'History'],
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 15,
    title: 'River Safari in Bentota',
    shortDescription: 'Cruise the mangroves.',
    priceMin: 3000,
    location: { city: 'Bentota', district: 'Galle' },
    ratingAverage: 4.5,
    ratingCount: 33,
    category: 'Wildlife',
    listingType: ListingType.EXPERIENCE,
    tags: ['Wildlife', 'Nature'],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 16,
    title: 'Jaffna Food & Culture Tour',
    shortDescription: 'Northern flavors and stories.',
    priceMin: 4500,
    location: { city: 'Jaffna', district: 'Jaffna' },
    ratingAverage: 4.8,
    ratingCount: 25,
    category: 'Food',
    listingType: ListingType.EXPERIENCE,
    tags: ['Food', 'Culture'],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 17,
    title: 'Premium Ceylon Tea Gift Box',
    shortDescription: 'Curated teas for gifting.',
    priceMin: 3500,
    location: { city: 'Nuwara Eliya', district: 'Nuwara Eliya' },
    ratingAverage: 4.9,
    ratingCount: 102,
    category: 'Food',
    listingType: ListingType.PRODUCT,
    tags: ['Tea', 'Gift'],
    specs: {
      composition: 'Assorted Ceylon tea leaves and blends.',
      dimensions: 'Box size: 10x10x5 inches.',
      care: 'Store in a cool, dry place.',
    },
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 18,
    title: 'Handloom Cotton Saree',
    shortDescription: 'Traditional handloom saree.',
    priceMin: 8500,
    location: { city: 'Kurunegala', district: 'Kurunegala' },
    ratingAverage: 4.8,
    ratingCount: 61,
    category: 'Culture',
    listingType: ListingType.PRODUCT,
    tags: ['Textile', 'Craft'],
    specs: {
      composition: 'Handloom cotton with natural dyes.',
      dimensions: 'Standard saree length 5.5m.',
      care: 'Hand wash in cool water.',
    },
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 19,
    title: 'Traditional Brass Oil Lamp',
    shortDescription: 'Handcrafted brass lamp.',
    priceMin: 5500,
    location: { city: 'Kandy', district: 'Kandy' },
    ratingAverage: 4.7,
    ratingCount: 29,
    category: 'Culture',
    listingType: ListingType.PRODUCT,
    tags: ['Craft', 'Heritage'],
    specs: {
      composition: 'Solid brass, hand-finished.',
      dimensions: 'Approx 35cm tall.',
      care: 'Polish with brass cleaner when needed.',
    },
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 20,
    title: 'Anuradhapura Ancient City Tour',
    shortDescription: 'Explore sacred ancient ruins and stupas.',
    longDescription:
      'Visit one of the oldest continuously inhabited cities in the world. See the sacred Bodhi tree, massive dagobas, and intricate stone carvings dating back over 2,000 years.',
    priceMin: 5500,
    location: { city: 'Anuradhapura', district: 'Colombo' },
    ratingAverage: 4.9,
    ratingCount: 95,
    category: 'Historical Sites',
    listingType: ListingType.EXPERIENCE,
    tags: ['History', 'Culture', 'UNESCO'],
    inclusions: [
      { title: 'Expert Guide', description: 'Archaeological expert with deep historical knowledge.' },
      { title: 'Transport', description: 'Air-conditioned vehicle for site visits.' },
      { title: 'Lunch', description: 'Traditional Sri Lankan meal included.' },
    ],
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 21,
    title: 'Ayurvedic Spa Retreat',
    shortDescription: 'Traditional healing and relaxation.',
    longDescription:
      'Experience authentic Ayurvedic treatments in a serene environment. Includes herbal massages, steam baths, and personalized wellness consultations.',
    priceMin: 7500,
    location: { city: 'Bentota', district: 'Galle' },
    ratingAverage: 4.8,
    ratingCount: 67,
    category: 'Wellness/Spa',
    listingType: ListingType.EXPERIENCE,
    tags: ['Wellness', 'Spa', 'Ayurveda'],
    inclusions: [
      { title: 'Ayurvedic Massage', description: '90-minute traditional herbal oil massage.' },
      { title: 'Steam Bath', description: 'Herbal steam therapy session.' },
      { title: 'Wellness Consultation', description: 'Personal health assessment by Ayurvedic doctor.' },
    ],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 22,
    title: 'Hand-Woven Batik Sarong',
    shortDescription: 'Authentic Sri Lankan batik textile.',
    longDescription:
      'Beautiful hand-painted batik sarong featuring traditional Sri Lankan motifs. Each piece is unique and crafted by local artisans.',
    priceMin: 4500,
    location: { city: 'Kandy', district: 'Kandy' },
    ratingAverage: 4.7,
    ratingCount: 43,
    category: 'Handicrafts & Textiles',
    listingType: ListingType.PRODUCT,
    tags: ['Textile', 'Batik', 'Handicraft'],
    specs: {
      composition: '100% cotton with natural dyes and wax-resist technique.',
      dimensions: 'Standard sarong size 110cm x 200cm.',
      care: 'Hand wash in cold water, do not bleach.',
    },
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 23,
    title: 'Ceylon Blue Sapphire Ring',
    shortDescription: 'Certified natural sapphire jewelry.',
    longDescription:
      'Exquisite blue sapphire sourced from Ratnapura, set in sterling silver. Comes with authenticity certificate and appraisal.',
    priceMin: 45000,
    location: { city: 'Ratnapura', district: 'Colombo' },
    ratingAverage: 4.9,
    ratingCount: 38,
    category: 'Gemstones & Jewelry',
    listingType: ListingType.PRODUCT,
    tags: ['Jewelry', 'Gemstone', 'Luxury'],
    specs: {
      composition: 'Natural Ceylon blue sapphire, sterling silver setting.',
      dimensions: 'Sapphire: 3 carats, Ring size customizable.',
      care: 'Clean with soft cloth, store in provided box.',
    },
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 24,
    title: 'Organic Ceylon Spice Collection',
    shortDescription: 'Premium spice gift set.',
    longDescription:
      'A curated collection of Sri Lanka\'s finest organic spices including cinnamon, cardamom, cloves, and nutmeg. Perfect for cooking enthusiasts.',
    priceMin: 3200,
    location: { city: 'Matale', district: 'Matale' },
    ratingAverage: 4.8,
    ratingCount: 78,
    category: 'Tea & Spices',
    listingType: ListingType.PRODUCT,
    tags: ['Spices', 'Organic', 'Gift'],
    specs: {
      composition: 'Ceylon cinnamon, cardamom, cloves, pepper, nutmeg - all organic certified.',
      dimensions: 'Gift box 8x8x4 inches, 500g total weight.',
      care: 'Store in airtight containers away from direct sunlight.',
    },
    mediaUrl: '/assets/photos/B6.jpg',
  },
  {
    id: 25,
    title: 'Spice Garden Tour & Workshop',
    shortDescription: 'Learn about Sri Lankan spices.',
    longDescription:
      'Guided tour through organic spice gardens. Learn about cultivation, harvesting, and traditional uses. Includes hands-on cooking demonstration.',
    priceMin: 3500,
    location: { city: 'Matale', district: 'Matale' },
    ratingAverage: 4.7,
    ratingCount: 52,
    category: 'Tea & Spices',
    listingType: ListingType.EXPERIENCE,
    tags: ['Spices', 'Food', 'Educational'],
    inclusions: [
      { title: 'Garden Tour', description: 'Walk through organic spice plantations.' },
      { title: 'Cooking Demo', description: 'Learn to prepare traditional spice blends.' },
      { title: 'Take-home Kit', description: 'Small spice collection to take with you.' },
    ],
    mediaUrl: '/assets/photos/B7.jpg',
  },
  {
    id: 26,
    title: 'Lace Making Workshop',
    shortDescription: 'Traditional Galle lace craft.',
    longDescription:
      'Learn the intricate art of bobbin lace making, a tradition brought by Portuguese colonists. Create your own lace piece to take home.',
    priceMin: 2500,
    location: { city: 'Galle', district: 'Galle' },
    ratingAverage: 4.6,
    ratingCount: 31,
    category: 'Handicrafts & Textiles',
    listingType: ListingType.EXPERIENCE,
    tags: ['Craft', 'Workshop', 'Heritage'],
    inclusions: [
      { title: 'Materials Provided', description: 'All lace-making tools and threads included.' },
      { title: 'Expert Instruction', description: 'Learn from master lace makers.' },
      { title: 'Your Creation', description: 'Take home your handmade lace piece.' },
    ],
    mediaUrl: '/assets/photos/B4.webp',
  },
  {
    id: 27,
    title: 'Gem Mining Experience',
    shortDescription: 'Search for gemstones in Ratnapura.',
    longDescription:
      'Join local gem miners in Ratnapura, the "City of Gems". Learn traditional mining techniques and try your hand at gem panning.',
    priceMin: 8500,
    location: { city: 'Ratnapura', district: 'Colombo' },
    ratingAverage: 4.8,
    ratingCount: 44,
    category: 'Gemstones & Jewelry',
    listingType: ListingType.EXPERIENCE,
    tags: ['Gemstones', 'Adventure', 'Educational'],
    inclusions: [
      { title: 'Mine Visit', description: 'Tour active gem mining operations.' },
      { title: 'Gem Panning', description: 'Try your luck at finding gemstones.' },
      { title: 'Expert Guide', description: 'Learn to identify different gemstones.' },
    ],
    mediaUrl: '/assets/photos/B8.jpg',
  },
  {
    id: 28,
    title: 'Polonnaruwa Medieval Capital Tour',
    shortDescription: 'Explore the medieval kingdom ruins.',
    longDescription:
      'Discover the well-preserved ruins of Sri Lanka\'s medieval capital. See the royal palace, Gal Vihara rock sculptures, and ancient irrigation systems.',
    priceMin: 4800,
    location: { city: 'Polonnaruwa', district: 'Matale' },
    ratingAverage: 4.9,
    ratingCount: 86,
    category: 'Historical Sites',
    listingType: ListingType.EXPERIENCE,
    tags: ['History', 'UNESCO', 'Culture'],
    inclusions: [
      { title: 'Bicycle Tour', description: 'Explore the vast site by bicycle.' },
      { title: 'Archaeological Guide', description: 'Expert commentary on historical significance.' },
      { title: 'Museum Entry', description: 'Access to Polonnaruwa archaeological museum.' },
    ],
    mediaUrl: '/assets/photos/B6.jpg',
  },
];

async function main() {
  console.log('Seeding marketplace data...');

  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@example.com' },
    update: {
      fullName: 'Vendor Admin',
      role: 'ADMIN',
      isActive: true,
    },
    create: {
      fullName: 'Vendor Admin',
      email: 'vendor@example.com',
      passwordHash: 'securehash',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {
      businessName: 'Ayubowan Experiences',
      shortTagline: 'Authentic Sri Lankan journeys',
      verifiedStatus: 'VERIFIED',
      profileComplete: true,
      isActive: true,
    },
    create: {
      userId: vendorUser.id,
      businessName: 'Ayubowan Experiences',
      shortTagline: 'Authentic Sri Lankan journeys',
      verifiedStatus: 'VERIFIED',
      profileComplete: true,
      isActive: true,
    },
  });

  const categories = await Promise.all(
    Array.from(new Set(listingSeed.map((listing) => listing.category))).map(
      (categoryName) =>
        prisma.listingCategory.upsert({
          where: { categoryName },
          update: {},
          create: { categoryName },
        }),
    ),
  );

  const categoryByName = new Map(categories.map((category) => [category.categoryName, category]));

  for (const listing of listingSeed) {
    const province =
      provinceByDistrict[listing.location.district] ?? 'Central';

    const coordinates = coordinatesByCity[listing.location.city] || { lat: 7.8731, lng: 80.7718 }; // Default to Sri Lanka center

    const location = await prisma.vendorLocation.findFirst({
      where: {
        vendorId: vendor.id,
        city: listing.location.city,
        district: listing.location.district,
        province,
      },
    });

    const vendorLocation = location
      ? await prisma.vendorLocation.update({
          where: { id: location.id },
          data: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        })
      : await prisma.vendorLocation.create({
          data: {
            vendorId: vendor.id,
            addressLine1: 'Main street',
            city: listing.location.city,
            district: listing.location.district,
            province,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            isMainLocation: listing.location.district === 'Kandy',
          },
        });

    const category = categoryByName.get(listing.category);
    if (!category) {
      throw new Error(`Missing category ${listing.category}`);
    }

    const existing = await prisma.listing.findFirst({
      where: {
        vendorId: vendor.id,
        title: listing.title,
      },
    });

    if (existing) {
      const updated = await prisma.listing.update({
        where: { id: existing.id },
        data: {
          vendorId: vendor.id,
          categoryId: category.id,
          addressId: vendorLocation.id,
          listingType: listing.listingType,
          title: listing.title,
          shortDescription: listing.shortDescription,
          longDescription: listing.longDescription,
          priceMin: listing.priceMin,
          ratingAverage: listing.ratingAverage,
          ratingCount: listing.ratingCount,
          tags: listing.tags ?? [],
          inclusions: listing.inclusions ?? undefined,
          specs: listing.specs ?? undefined,
          visibilityStatus: VisibilityStatus.PUBLISHED,
          media: {
            deleteMany: {},
            create: [
              {
                mediaType: 'IMAGE',
                mediaUrl: listing.mediaUrl,
                isPrimary: true,
              },
            ],
          },
          search: {
            upsert: {
              create: {
                categoryId: category.id,
                priceMin: listing.priceMin,
                priceMax: null,
                city: vendorLocation.city,
                district: vendorLocation.district,
                province: vendorLocation.province,
              },
              update: {
                categoryId: category.id,
                priceMin: listing.priceMin,
                priceMax: null,
                city: vendorLocation.city,
                district: vendorLocation.district,
                province: vendorLocation.province,
              },
            },
          },
        },
      });

      console.log(`Updated listing ${updated.id}: ${updated.title}`);
      continue;
    }

    const created = await prisma.listing.create({
      data: {
        vendorId: vendor.id,
        categoryId: category.id,
        addressId: vendorLocation.id,
        listingType: listing.listingType,
        title: listing.title,
        shortDescription: listing.shortDescription,
        longDescription: listing.longDescription,
        priceMin: listing.priceMin,
        ratingAverage: listing.ratingAverage,
        ratingCount: listing.ratingCount,
        tags: listing.tags ?? [],
        inclusions: listing.inclusions ?? undefined,
        specs: listing.specs ?? undefined,
        visibilityStatus: VisibilityStatus.PUBLISHED,
        media: {
          create: [
            {
              mediaType: 'IMAGE',
              mediaUrl: listing.mediaUrl,
              isPrimary: true,
            },
          ],
        },
        search: {
          create: {
            categoryId: category.id,
            priceMin: listing.priceMin,
            priceMax: null,
            city: vendorLocation.city,
            district: vendorLocation.district,
            province: vendorLocation.province,
          },
        },
      },
    });

    console.log(`Created listing ${created.id}: ${created.title}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
