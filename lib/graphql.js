export async function fetchGraphQL(query, variables = {}) {
  const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      throw new Error("Failed to fetch API");
    }

    return json.data;
  } catch (error) {
    console.error("fetchGraphQL Error:", error);
    return null;
  }
}

import { localVehicles } from './localVehicles';
import { createClient } from '@/utils/supabase/server';

export async function getVehicles(limit = 20) {
  try {
    const supabase = await createClient();
    const { data: supabaseData, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return localVehicles;
    }

    // Map supabase vehicles to the expected UI shape
    const remoteVehicles = (supabaseData || []).map(v => ({
      id: v.id,
      title: `${v.year} ${v.make} ${v.model}`,
      slug: (v.slug || v.id || '').trim().replace(/\s+/g, '-'),
      rawSlug: v.slug,
      status: v.status || 'available',
      tags: v.tags || [],
      videoUrl: v.videoUrl || '',
      content: v.description ? `<p>${v.description}</p>` : '',
      featuredImage: {
        node: {
          sourceUrl: v.images?.[0] || null,
          altText: `${v.year} ${v.make} ${v.model}`
        }
      },
      galleryImages: v.images || [],
      vehicleDetails: {
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        mileage: v.mileage,
        vin: v.vin,
        status: v.status || 'available',
        bodyType: v.body_type || 'Sedan',
        transmission: v.transmission || 'Automatic',
        fuelType: v.fuel_type || 'Gasoline',
        tags: v.tags || []
      }
    }));

    if (remoteVehicles.length > 0) {
      return remoteVehicles;
    }

    return localVehicles;
  } catch (error) {
    console.error('getVehicles Error:', error);
    return localVehicles;
  }
}
