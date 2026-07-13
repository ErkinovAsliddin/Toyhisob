import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES_DATA = [
  { name: "Catering & Osh", slug: "catering", icon: "UtensilsCrossed", sortOrder: 1 },
  { name: "Venue & Hall", slug: "venue", icon: "Building2", sortOrder: 2 },
  { name: "Photo & Video", slug: "photography", icon: "Camera", sortOrder: 3 },
  { name: "Music & Entertainment", slug: "music", icon: "Music", sortOrder: 4 },
  { name: "Decoration & Florals", slug: "decoration", icon: "Flower2", sortOrder: 5 },
  { name: "Clothing & Accessories", slug: "clothing", icon: "Shirt", sortOrder: 6 },
  { name: "Transport & Cars", slug: "transport", icon: "Car", sortOrder: 7 },
  { name: "Invitations & Cards", slug: "invitations", icon: "Mail", sortOrder: 8 },
  { name: "Gifts & Sarpo", slug: "gifts", icon: "Gift", sortOrder: 9 },
];

const CITIES_DATA = [
  { name: "Tashkent", nameUz: "Toshkent", region: "Tashkent" },
  { name: "Samarkand", nameUz: "Samarqand", region: "Samarkand" },
  { name: "Bukhara", nameUz: "Buxoro", region: "Bukhara" },
  { name: "Namangan", nameUz: "Namangan", region: "Namangan" },
  { name: "Andijan", nameUz: "Andijon", region: "Andijan" },
  { name: "Fergana", nameUz: "Farg'ona", region: "Fergana" },
  { name: "Nukus", nameUz: "Nukus", region: "Karakalpakstan" },
  { name: "Karshi", nameUz: "Qarshi", region: "Kashkadarya" },
  { name: "Termez", nameUz: "Termiz", region: "Surkhandarya" },
  { name: "Jizzakh", nameUz: "Jizzax", region: "Jizzakh" },
  { name: "Urgench", nameUz: "Urganch", region: "Khorezm" },
  { name: "Navoi", nameUz: "Navoiy", region: "Navoi" },
];

const VENDORS_DATA = [
  {
    businessName: "Osh Bey Wedding Catering",
    slug: "osh-bey",
    description: "Premium Uzbek catering specializing in wedding osh/plov and multi-course feast menus. Over 15 years of experience serving Tashkent's finest weddings.",
    city: "Tashkent",
    phone: "+998901234567",
    whatsapp: "+998901234567",
    verified: true,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    categories: [
      {
        name: "Catering & Osh",
        slug: "catering",
        tiers: [
          {
            name: "Budget",
            slug: "budget",
            description: "Traditional Uzbek osh/plov with bread and tea service",
            price: 180000,
            priceUnit: "per_guest",
            features: ["Traditional osh/plov", "Fresh non bread", "Salads (2 types)", "Tea & sweets service"],
            images: [],
            popular: false,
          },
          {
            name: "Standard",
            slug: "standard",
            description: "Multi-course wedding feast with waiter service",
            price: 320000,
            priceUnit: "per_guest",
            features: ["Multi-course meal (5+ dishes)", "Fruit platter", "Waiter service (4 staff)", "Table settings", "Hot & cold appetizers"],
            images: [],
            popular: true,
          },
          {
            name: "Premium",
            slug: "premium",
            description: "Luxury wedding banquet with live cooking and premium drinks",
            price: 500000,
            priceUnit: "per_guest",
            features: ["Full luxury 8-course menu", "Live cooking station", "Premium drinks package", "VIP waiter team (8 staff)", "Custom wedding cake", "Late-night snacks"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
  {
    businessName: "Golden Palace Banquet Hall",
    slug: "golden-palace",
    description: "One of Tashkent's most prestigious wedding venues. Crystal chandeliers, marble floors, and capacity for up to 300 guests.",
    city: "Tashkent",
    phone: "+998902345678",
    whatsapp: "+998902345678",
    verified: true,
    featured: false,
    rating: 4.6,
    reviewCount: 89,
    categories: [
      {
        name: "Venue & Hall",
        slug: "venue",
        tiers: [
          {
            name: "Hall Only",
            slug: "hall-only",
            description: "Beautiful banquet hall with basic amenities",
            price: 15000000,
            priceUnit: "fixed",
            capacity: 200,
            features: ["Banquet hall (200 cap)", "Basic sound system", "Tables & chairs included", "Parking (50 cars)", "Bridal waiting room"],
            images: [],
            popular: false,
          },
          {
            name: "Hall + Decor Package",
            slug: "hall-decor",
            description: "Hall with stage setup and floral decorations",
            price: 22000000,
            priceUnit: "fixed",
            capacity: 200,
            features: ["Everything in Hall Only", "Stage backdrop", "Floral arrangements", "LED lighting", "Dance floor lighting"],
            images: [],
            popular: true,
          },
          {
            name: "Full Premium Package",
            slug: "full-premium",
            description: "Complete wedding experience with premium decor and VIP amenities",
            price: 35000000,
            priceUnit: "fixed",
            capacity: 300,
            features: ["Everything in Hall + Decor", "Premium imported flowers", "VIP lounge area", "Full AV system", "Bridal suite", "Valet parking", "Security service"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
  {
    businessName: "Dilshod Studio Photography",
    slug: "dilshod-studio",
    description: "Award-winning wedding photography studio. Capturing love stories with a blend of traditional Uzbek aesthetics and modern cinematic style.",
    city: "Tashkent",
    phone: "+998903456789",
    whatsapp: "+998903456789",
    verified: true,
    featured: true,
    rating: 4.9,
    reviewCount: 203,
    categories: [
      {
        name: "Photo & Video",
        slug: "photography",
        tiers: [
          {
            name: "Essential",
            slug: "essential",
            description: "Core wedding day coverage with edited photos",
            price: 5000000,
            priceUnit: "fixed",
            features: ["6 hours coverage", "1 professional photographer", "200+ edited photos", "Online gallery", "Print rights included"],
            images: [],
            popular: false,
          },
          {
            name: "Professional",
            slug: "professional",
            description: "Full day coverage with photo and video team",
            price: 10000000,
            priceUnit: "fixed",
            features: ["Full day coverage (10+ hours)", "2 photographers", "1 videographer", "500+ edited photos", "3-5 min highlight video", "Same-day preview (10 photos)"],
            images: [],
            popular: true,
          },
          {
            name: "Cinematic",
            slug: "cinematic",
            description: "Complete cinematic wedding experience with drone footage",
            price: 18000000,
            priceUnit: "fixed",
            features: ["Full day + preparation coverage", "3-person team", "Drone aerial shots", "10-15 min cinematic film", "Wedding album (50 pages)", "Wall print (1)", "Social media teaser"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
  {
    businessName: "Navo'i Ensemble Live Music",
    slug: "navoi-ensemble",
    description: "Professional live music entertainment for weddings. From modern DJ sets to traditional Uzbek ensemble performances with karnay and surnay.",
    city: "Tashkent",
    phone: "+998904567890",
    whatsapp: "+998904567890",
    verified: true,
    featured: false,
    rating: 4.7,
    reviewCount: 67,
    categories: [
      {
        name: "Music & Entertainment",
        slug: "music",
        tiers: [
          {
            name: "DJ Only",
            slug: "dj-only",
            description: "Professional DJ with sound system",
            price: 3000000,
            priceUnit: "fixed",
            features: ["Professional DJ", "Sound system included", "4 hours performance", "Custom playlist", "Wireless mic (2)"],
            images: [],
            popular: false,
          },
          {
            name: "DJ + Live Saxophone",
            slug: "dj-sax",
            description: "DJ with live saxophone for a unique experience",
            price: 6000000,
            priceUnit: "fixed",
            features: ["Professional DJ + Saxophonist", "Full sound system", "6 hours performance", "MC/host service", "Dance floor lighting"],
            images: [],
            popular: true,
          },
          {
            name: "Full Ensemble",
            slug: "full-ensemble",
            description: "Complete live band with traditional and modern repertoire",
            price: 12000000,
            priceUnit: "fixed",
            features: ["5-piece live band", "Traditional + modern songs", "Karnay & surnay ceremony", "Full PA & lighting system", "MC coordination", "8 hours performance", "Guest request songs"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
  {
    businessName: "Gulnora Floral Design",
    slug: "gulnora-floral",
    description: "Boutique floral design studio creating breathtaking wedding decorations. From simple elegant centerpieces to full venue transformations.",
    city: "Tashkent",
    phone: "+998905678901",
    whatsapp: "+998905678901",
    verified: false,
    featured: false,
    rating: 4.5,
    reviewCount: 45,
    categories: [
      {
        name: "Decoration & Florals",
        slug: "decoration",
        tiers: [
          {
            name: "Simple Elegance",
            slug: "simple",
            description: "Basic floral arrangements for key areas",
            price: 3000000,
            priceUnit: "fixed",
            features: ["Table centerpieces (10)", "Entrance arch decoration", "Seasonal fresh flowers", "Basic candle setup"],
            images: [],
            popular: false,
          },
          {
            name: "Elegant Garden",
            slug: "elegant",
            description: "Complete stage and table decoration with draping",
            price: 7000000,
            priceUnit: "fixed",
            features: ["Stage backdrop design", "15 table centerpieces", "Candles & fabric draping", "Aisle decoration", "Welcome sign floral frame"],
            images: [],
            popular: true,
          },
          {
            name: "Luxury Transformation",
            slug: "luxury",
            description: "Full venue transformation with imported flowers and custom installations",
            price: 15000000,
            priceUnit: "fixed",
            features: ["Complete venue redesign", "Imported premium flowers", "Custom floral installations", "Professional lighting design", "Ceiling decorations", "Photo corner setup", "Guest book table styling"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
  {
    businessName: "Registan Rent-a-Car Wedding",
    slug: "registan-cars",
    description: "Luxury wedding car rental with decorated vehicles. Classic and modern options available with professional drivers.",
    city: "Tashkent",
    phone: "+998906789012",
    whatsapp: "+998906789012",
    verified: true,
    featured: false,
    rating: 4.4,
    reviewCount: 38,
    categories: [
      {
        name: "Transport & Cars",
        slug: "transport",
        tiers: [
          {
            name: "Basic Decor",
            slug: "basic-decor",
            description: "One decorated wedding car with driver",
            price: 2000000,
            priceUnit: "fixed",
            features: ["1 decorated sedan", "Professional driver", "4 hours rental", "Basic flower decoration", "Ribbons & bows"],
            images: [],
            popular: false,
          },
          {
            name: "Premium Convoy",
            slug: "premium-convoy",
            description: "Luxury car fleet for the wedding party",
            price: 5000000,
            priceUnit: "fixed",
            features: ["1 luxury lead car (Mercedes/BMW)", "3 decorated escort cars", "Full flower decoration", "Professional drivers (4)", "6 hours rental", "Red carpet service"],
            images: [],
            popular: true,
          },
          {
            name: "VIP Experience",
            slug: "vip-experience",
            description: "Ultimate wedding transportation with vintage car option",
            price: 10000000,
            priceUnit: "fixed",
            features: ["Vintage/classic car option", "5-car decorated convoy", "Full luxury flower packages", "Chauffeur service", "Full day rental", "Guest shuttle service", "Champagne welcome"],
            images: [],
            popular: false,
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  // Seed categories
  for (const cat of CATEGORIES_DATA) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Categories seeded.");

  // Seed cities
  for (const city of CITIES_DATA) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: city,
    });
  }
  console.log("Cities seeded.");

  // Seed vendors
  for (const vendorData of VENDORS_DATA) {
    const { categories: vendorCategories, ...vendorInfo } = vendorData;

    const user = await prisma.user.create({
      data: {
        name: vendorInfo.businessName,
        role: "VENDOR",
      },
    });

    const vendor = await prisma.vendorProfile.create({
      data: {
        userId: user.id,
        businessName: vendorInfo.businessName,
        slug: vendorInfo.slug,
        description: vendorInfo.description,
        city: vendorInfo.city,
        phone: vendorInfo.phone,
        whatsapp: vendorInfo.whatsapp,
        verified: vendorInfo.verified,
        featured: vendorInfo.featured,
        rating: vendorInfo.rating,
        reviewCount: vendorInfo.reviewCount,
      },
    });

    for (const catData of vendorCategories) {
      const category = await prisma.vendorCategory.create({
        data: {
          vendorId: vendor.id,
          name: catData.name,
          slug: catData.slug,
        },
      });

      for (const tierData of catData.tiers) {
        await prisma.vendorTier.create({
          data: {
            categoryId: category.id,
            vendorId: vendor.id,
            name: tierData.name,
            slug: tierData.slug,
            description: tierData.description,
            price: tierData.price,
            priceUnit: tierData.priceUnit,
            capacity:  "capacity" in tierData ? tierData.capacity ?? null : null,
            features: tierData.features,
            images: tierData.images,
            popular: tierData.popular,
          },
        });
      }
    }
  }
  console.log("Vendors seeded.");

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
