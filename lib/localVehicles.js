const buickImages = [
  "featured.jpeg",
  ...Array.from({ length: 11 }, (_, i) => `buick-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/buick-lacrosse-2011/${name}`);

const cruzeImages = [
  "featured.jpeg",
  ...Array.from({ length: 21 }, (_, i) => `cruze-${String(i + 1).padStart(2, '0')}.jpeg`)
].map(name => `/images/inventory/chevy-cruze-2016/${name}`);

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
    id: "local-buick-2011",
    title: "2011 Buick LaCrosse CXL",
    slug: "2011-buick-lacrosse-cxl",
    status: "available",
    tags: [
      "Clean Title",
      "Under $4,000",
      "Luxury Sedan",
      "Ice Cold AC",
      "Automatic",
      "CXL Luxury Trim",
      "Alloy Wheels",
      "Rear Parking Sensors",
      "Clean In and Out",
      "Jacksonville FL"
    ],
    videoUrl: "",
    content: "<p>Super clean 2011 Buick LaCrosse CXL 4-door luxury sedan in excellent condition inside and out! Priced at an unbeatable $3,900. Powered by a dependable, smooth automatic engine paired with an effortless automatic transmission. Clean title, runs and drives perfect with no problems at all — everything works and runs smooth! Features ice-cold air conditioning, premium luxury interior, Buick signature waterfall chrome front grille, classic hood VentiPorts, multi-spoke factory alloy wheels with good tires, rear parking assist sensors, power windows, power door locks, power adjustable side mirrors with integrated turn signals, keyless entry, steering wheel audio controls, cruise control, and Driver Information Center (DIC) with digital speedometer. Completely clean inside and out, fully inspected and ready for immediate delivery in Jacksonville, FL. Visit Ahaaq Auto Exchange at 6615 N Main St, Jacksonville, FL 32208 or call (904) 502-9709 today!</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/buick-lacrosse-2011/featured.jpeg",
        altText: "2011 Buick LaCrosse CXL",
      },
    },
    galleryImages: buickImages,
    vehicleDetails: {
      make: "Buick",
      model: "LaCrosse CXL",
      year: 2011,
      price: "3900",
      mileage: "191056",
      vin: "1G4GD5E32BF191056",
      bodyType: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: [
        "Clean Title",
        "Under $4,000",
        "Luxury Sedan",
        "Ice Cold AC",
        "Automatic",
        "CXL Luxury Trim",
        "Alloy Wheels",
        "Rear Parking Sensors",
        "Clean In and Out",
        "Jacksonville FL"
      ],
      seo_title: "2011 Buick LaCrosse CXL For Sale Jacksonville FL | Luxury Sedan $3,900 | Ahaaq Auto Exchange",
      seo_description: "Clean 2011 Buick LaCrosse CXL luxury sedan for sale in Jacksonville, FL for only $3,900! 191k miles, clean title, ice cold AC, smooth automatic transmission, alloy wheels, parking sensors. Test drive at 6615 N Main St, Jacksonville FL."
    },
  },
  {
    id: "local-cruze-2016",
    title: "2016 Chevrolet Cruze Limited LT",
    slug: "2016-chevrolet-cruze-limited-lt",
    status: "available",
    tags: [
      "Clean Title",
      "Under $5,000",
      "Fuel Efficient 1.4L Turbo",
      "Ice Cold AC",
      "Automatic",
      "ECOTEC Engine",
      "Alloy Wheels",
      "Clean In and Out",
      "Sedan",
      "Commuter Ready"
    ],
    videoUrl: "",
    content: "<p>Super clean 2016 Chevrolet Cruze Limited LT 4-door sedan in excellent condition inside and out! Priced at an unbeatable $4,900. Powered by a fuel-efficient and spirited 1.4L 4-cylinder ECOTEC Turbocharged engine paired with a smooth 6-speed automatic transmission with manual shift mode (FWD). Features ice-cold air conditioning, clean black premium cloth interior, power windows, power door locks, power adjustable side mirrors, keyless entry, alloy wheels with strong tires, factory sound system with CD/MP3/AUX/Bluetooth connectivity, steering wheel audio and cruise controls, and 60/40 split-folding rear seats with expansive trunk capacity. Clean title, runs and drives perfect with no problems at all. Fully inspected and road-ready for Jacksonville and North Florida drivers. Contact Ahaaq Auto Exchange today for a test drive!</p>",
    featuredImage: {
      node: {
        sourceUrl: "/images/inventory/chevy-cruze-2016/featured.jpeg",
        altText: "2016 Chevrolet Cruze Limited LT",
      },
    },
    galleryImages: cruzeImages,
    vehicleDetails: {
      make: "Chevrolet",
      model: "Cruze Limited LT",
      year: 2016,
      price: "4900",
      mileage: "161852",
      vin: "1G1PE5SB2G7106794",
      bodyType: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      status: "available",
      tags: [
        "Clean Title",
        "Under $5,000",
        "Fuel Efficient 1.4L Turbo",
        "Ice Cold AC",
        "Automatic",
        "ECOTEC Engine",
        "Alloy Wheels",
        "Clean In and Out",
        "Sedan",
        "Commuter Ready"
      ],
      seo_title: "2016 Chevrolet Cruze Limited LT For Sale Jacksonville FL | Clean Sedan $4,900 | Ahaaq Auto Exchange",
      seo_description: "Clean 2016 Chevrolet Cruze Limited LT 1.4L Turbo Sedan for sale in Jacksonville, FL for only $4,900! 161k miles, clean title, ice cold AC, smooth automatic, alloy wheels, power options. Test drive at 6615 N Main St, Jacksonville FL."
    },
  },
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
      tags: ["Clean Title", "Low Miles", "Ice Cold AC", "Chrome Rims", "Brand New Tires", "Automatic", "V6 Power", "Leather Seats", "Sunroof"],
      seo_title: "2006 Acura TL for Sale in Jacksonville FL | Clean Title, Chrome Rims | Ahaaq Auto Exchange",
      seo_description: "2006 Acura TL for sale in Jacksonville FL. Clean title, 168k miles, runs & drives perfect with ice cold AC, chrome rims with brand new tires, automatic transmission."
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
      tags: ["Reliable", "Clean Commuter", "Low Maintenance", "Cold AC"],
      seo_title: "2010 Toyota Corolla For Sale Jacksonville FL | Clean Commuter $4,900 | Ahaaq Auto Exchange",
      seo_description: "Clean 2010 Toyota Corolla for sale in Jacksonville, FL for $4,900! Legendary reliability, ice cold AC, fuel efficient commuter car."
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
      tags: ["AWD SUV", "Spacious", "Family Ready", "Roof Rails"],
      seo_title: "2012 Hyundai Santa Fe AWD For Sale Jacksonville FL | $5,900 | Ahaaq Auto Exchange",
      seo_description: "Spacious 2012 Hyundai Santa Fe AWD SUV for sale in Jacksonville, FL for $5,900. Low miles, family ready, well-maintained."
    },
  },
];
