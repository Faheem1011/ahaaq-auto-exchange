import { getVehicles } from "@/lib/graphql";

export const dynamic = 'force-dynamic';

export async function GET() {
  const vehicles = await getVehicles(100);
  const baseUrl = "https://ahhaqautoexchange.net";

  const staticPages = [
    { path: "", priority: "1.0", changefreq: "daily" },
    { path: "/inventory", priority: "0.9", changefreq: "daily" },
    { path: "/auto-repair", priority: "0.85", changefreq: "weekly" },
    { path: "/body-shop", priority: "0.85", changefreq: "weekly" },
    { path: "/window-tinting", priority: "0.85", changefreq: "weekly" },
    { path: "/book-service", priority: "0.8", changefreq: "weekly" },
    { path: "/sell-your-car", priority: "0.8", changefreq: "weekly" },
    { path: "/service-specials", priority: "0.8", changefreq: "weekly" },
    { path: "/finance", priority: "0.8", changefreq: "weekly" },
    { path: "/finance/apply", priority: "0.8", changefreq: "weekly" },
    { path: "/finance/pre-qualify", priority: "0.8", changefreq: "weekly" },
    { path: "/finance/trade-in", priority: "0.8", changefreq: "weekly" },
    { path: "/finance/calculator", priority: "0.7", changefreq: "monthly" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
    { path: "/faq", priority: "0.6", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page.path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `;
        })
        .join("")}
      ${vehicles
        .map((vehicle) => {
          const featuredImg = vehicle.featuredImage?.node?.sourceUrl || vehicle.galleryImages?.[0];
          const imgXml = featuredImg ? `
            <image:image>
              <image:loc>${featuredImg.startsWith('http') ? featuredImg : `${baseUrl}${featuredImg}`}</image:loc>
              <image:title>${vehicle.title} Jacksonville FL</image:title>
              <image:caption>${vehicle.title} available at Ahaaq Auto Exchange in Jacksonville, FL</image:caption>
            </image:image>
          ` : '';

          return `
            <url>
              <loc>${baseUrl}/inventory/${vehicle.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
              ${imgXml}
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
