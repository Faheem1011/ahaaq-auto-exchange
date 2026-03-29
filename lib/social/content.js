/**
 * lib/social/content.js
 * Caption templates + image URL builder
 *
 * Images served from Supabase Storage (FREE — 1GB included).
 * Public bucket URLs work directly with Meta & TikTok APIs.
 */

const TEMPLATES = {
  new: (v) =>
    `
🚗 NEW ARRIVAL — ${v.year} ${v.make} ${v.model}
${v.trim ? `\nTrim: ${v.trim}` : ""}
💰 Price: ${formatPrice(v.price)}
📍 ${v.mileage ? `Mileage: ${Number(v.mileage).toLocaleString()} km` : "Brand New"}
🎨 Color: ${v.color || "See in showroom"}
⚙️ ${[v.transmission, v.fuel_type].filter(Boolean).join(" · ")}
${v.features?.length ? `\n✅ ${v.features.slice(0, 4).join("\n✅ ")}` : ""}

Visit us or book a test drive!
${process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || ""}/inventory/${v.slug || v.id}

#NewArrival #${(v.make || "").replace(/\s/g, "")} #${(v.year || "") + (v.make || "").replace(/\s/g, "")} #CarDealership #ForSale #Cars #Jacksonville #AhaaqAuto
  `.trim(),

  sold: (v) =>
    `
🎉 JUST SOLD — ${v.year} ${v.make} ${v.model}

This one found its new home! Congratulations to the new owner 🏠

Looking for something similar? New inventory added weekly.
👉 ${process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || ""}

#JustSold #${(v.make || "").replace(/\s/g, "")} #HappyCustomer #DealerLife #Automotive #Jacksonville
  `.trim(),

  updated: (v) =>
    `
🔔 PRICE DROP — ${v.year} ${v.make} ${v.model}

💰 Updated Price: ${formatPrice(v.price)}
Act fast — this one won't last!

${process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || ""}/inventory/${v.slug || v.id}

#PriceDrop #${(v.make || "").replace(/\s/g, "")} #CarDeal #Automotive #Jacksonville
  `.trim(),
};

function formatPrice(price) {
  if (!price) return "Contact us for pricing";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Builds the public image URL for a vehicle using Supabase Storage (FREE).
 */
export function buildImageUrl(vehicle) {
  // Use first photo/image in the array if available
  const photos = vehicle.photos || vehicle.images;
  if (photos?.length) {
    const photo = photos[0];
    if (photo.startsWith("http")) return photo;
    return `${process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vehicle-images/${photo}`;
  }

  // Fallback
  return `${process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || ""}/images/og-default.png`;
}

export function generateCaption(vehicle, eventType = "new") {
  const fn = TEMPLATES[eventType] || TEMPLATES.new;
  return fn(vehicle);
}
