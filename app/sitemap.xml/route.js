import { getVehicles } from "@/lib/graphql";

export async function GET() {
  const vehicles = await getVehicles(100);
  const baseUrl = "https://ahhaqautoexchange.net";

  const staticPages = [
    "",
    "/inventory",
    "/finance",
    "/about",
    "/contact",
    "/faq",
    "/finance/calculator",
    "/finance/trade-in",
    "/finance/apply",
    "/finance/pre-qualify",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page === "" ? "1.0" : "0.8"}</priority>
            </url>
          `;
        })
        .join("")}
      ${vehicles
        .map((vehicle) => {
          return `
            <url>
              <loc>${baseUrl}/inventory/${vehicle.slug}</loc>
              <lastmod>${new Date(vehicle.updatedAt || new Date()).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
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
