const escapeImages = [
  "featured.jpeg",
  ...Array.from({ length: 18 }, (_, i) => `escape-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/ford-escape-2012/${name}`);

const acuraImages = [
  "featured.jpeg",
  ...Array.from({ length: 13 }, (_, i) => `acura-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/acura-tl-2006/${name}`);

const santaFeImages = [
  "featured.jpeg",
  ...Array.from({ length: 16 }, (_, i) => `santafe-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/santa-fe-2012/${name}`);

const corollaImages = [
  "featured.jpeg",
  ...Array.from({ length: 15 }, (_, i) => `corolla-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/corolla-2010/${name}`);

export const localVehicles = [
  {
    id: "local-escape-2012",
    title: "2012 Ford Escape XLT",
    slug: "2012-ford-escape-xlt",
    status: "available",
    tags: ["Clean SUV", "Under $4,000", "Fuel Efficient 2.5L", "Ice Cold AC", "Automatic", "Spacious Cargo", "Alloy Wheels", "Keyless Entry", "Clean Title"],
    videoUrl: "",
    content: "<p>Super clean 2012 Ford Escape XLT compact SUV in great condition inside and out! Priced at an unbeatable $3,900. Powered by a dependable and fuel-efficient 2.5L 4-cylinder engine paired with a smooth automatic transmission. Features ice-cold air conditioning, clean tan cloth interior, power windows, power locks, power mirrors, keyless entry, alloy wheels with strong tires, factory audio system, and 60/40 split folding rear seats for ample cargo space. Fully inspected and road-ready for Jacksonville drivers. Contact Ahaaq Auto Exchange today for a test drive!</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/ford-escape-2012/featured.jpeg",
        altText: "2012 Ford Escape XLT",
      },
    },
    galleryImages: escapeImages,
    vehicleDetails: {
      make: "Ford",
      model: "Escape XLT",
      year: 2012,
      price: "3900",
      mileage: "172952",
      vin: "1FMCU0C76CKC60675",
      bodyType: "SUV",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: ["Clean SUV", "Under $4,000", "Fuel Efficient 2.5L", "Ice Cold AC", "Automatic", "Spacious Cargo", "Alloy Wheels", "Keyless Entry", "Clean Title"],
      seo_title: "2012 Ford Escape XLT For Sale Jacksonville FL | Clean SUV $3,900 | Ahaaq Auto Exchange",
      seo_description: "Clean 2012 Ford Escape XLT SUV for sale in Jacksonville, FL for only $3,900! Reliable 2.5L 4-cylinder, smooth automatic transmission, ice cold AC, power options, and clean title. Test drive at Ahaaq Auto Exchange."
    },
  },
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
