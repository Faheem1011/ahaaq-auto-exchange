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

export const localVehicles = [
  {
    id: "local-corolla-2010",
    title: "2010 Toyota Corolla",
    slug: "2010-toyota-corolla",
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
      fuelType: "Gasoline"
    },
  },
  {
    id: "local-santa-fe-2012",
    title: "2012 Hyundai Santa Fe",
    slug: "2012-hyundai-santa-fe",
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
      fuelType: "Gasoline"
    },
  },
];
