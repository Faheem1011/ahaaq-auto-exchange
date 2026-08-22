const corollaImages = [
  "WhatsApp Image 2026-03-18 at 12.24.09 AM.jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (1).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (2).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (3).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (4).jpeg",
  "featured.jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (6).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (7).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM (8).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.11 AM.jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (1).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (2).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (3).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (4).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (5).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM (6).jpeg",
  "WhatsApp Image 2026-03-18 at 12.24.12 AM.jpeg"
].map(name => `/images/inventory/corolla-2010/${encodeURIComponent(name)}`);

const santaFeImages = [
  "WhatsApp Image 2026-03-18 at 12.22.35 AM.jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (1).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (2).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (3).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (4).jpeg",
  "featured.jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (6).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (7).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM (8).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.36 AM.jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.37 AM (1).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.37 AM (2).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.37 AM (3).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.37 AM (4).jpeg",
  "WhatsApp Image 2026-03-18 at 12.22.37 AM.jpeg"
].map(name => `/images/inventory/santa-fe-2012/${encodeURIComponent(name)}`);

const acuraImages = [
  "featured.jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.45 AM (1).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.45 AM (2).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.45 AM (3).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.45 AM.jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (1).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (2).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (3).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (4).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (5).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM (6).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.46 AM.jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.47 AM (1).jpeg",
  "WhatsApp Image 2026-08-22 at 1.50.47 AM.jpeg"
].map(name => `/images/inventory/acura-tl-2006/${encodeURIComponent(name)}`);

export const localVehicles = [
  {
    id: "local-acura-tl-2006",
    title: "2006 Acura TL 3.2L V6",
    slug: "2006-acura-tl",
    status: "available",
    tags: ["Clean Title", "Low Miles", "Ice Cold AC", "Chrome Rims", "Brand New Tires", "Automatic", "V6 Power", "Leather Seats", "Sunroof"],
    videoUrl: "",
    content: "<p>Clean title, low miles — car got only 168k miles on it. Runs and drives perfect with no problem at all, everything runs perfect. Ice cold AC, Automatic engine, Automatic Transmission, super clean inside and out. Equipped with stunning chrome rims with brand new tires installed not even 3 months ago. Ready for immediate delivery at Ahaaq Auto Exchange in Jacksonville, FL.</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/acura-tl-2006/featured.jpeg",
        altText: "2006 Acura TL 3.2L V6",
      },
    },
    galleryImages: acuraImages,
    vehicleDetails: {
      make: "Acura",
      model: "TL",
      year: 2006,
      price: "4500",
      mileage: "168000",
      vin: "Contact Dealer",
      bodyType: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: ["Clean Title", "Low Miles", "Ice Cold AC", "Chrome Rims", "Brand New Tires", "Automatic", "V6 Power", "Leather Seats", "Sunroof"]
    },
  },
  {
    id: "local-corolla-2010",
    title: "2010 Toyota Corolla",
    slug: "2010-toyota-corolla",
    status: "available",
    tags: ["Reliable", "Clean Commuter", "Low Maintenance", "Cold AC"],
    videoUrl: "",
    content: "<p>Very clean 2010 Toyota Corolla. Local trade-in, perfect commuter car with legendary reliability. Runs and drives excellent, ice cold AC.</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/corolla-2010/featured.jpeg",
        altText: "2010 Toyota Corolla",
      },
    },
    galleryImages: corollaImages,
    vehicleDetails: {
      make: "Toyota",
      model: "Corolla",
      year: 2010,
      price: "4900",
      mileage: "205051",
      vin: "Contact Dealer",
      bodyType: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: ["Reliable", "Clean Commuter", "Low Maintenance", "Cold AC"]
    },
  },
  {
    id: "local-santa-fe-2012",
    title: "2012 Hyundai Santa Fe",
    slug: "2012-hyundai-santa-fe",
    status: "available",
    tags: ["AWD SUV", "Spacious", "Family Ready", "Roof Rails"],
    videoUrl: "",
    content: "<p>Spacious 2012 Hyundai Santa Fe AWD. Great family vehicle ready for any weather. Well-maintained interior and smooth comfortable ride.</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/santa-fe-2012/featured.jpeg",
        altText: "2012 Hyundai Santa Fe",
      },
    },
    galleryImages: santaFeImages,
    vehicleDetails: {
      make: "Hyundai",
      model: "Santa Fe",
      year: 2012,
      price: "5900",
      mileage: "104728",
      vin: "5XYZG3AB3CG135055",
      bodyType: "SUV",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: ["AWD SUV", "Spacious", "Family Ready", "Roof Rails"]
    },
  },
];
