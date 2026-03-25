export async function fetchGraphQL(query, variables = {}) {
  const WP_GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
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

export async function getVehicles(limit = 10) {
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
      slug: v.id,
      featuredImage: {
        node: {
          sourceUrl: v.images?.[0] || null,
          altText: `${v.year} ${v.make} ${v.model}`
        }
      },
      vehicleDetails: {
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        mileage: v.mileage,
        vin: v.vin
      }
    }));

    return [...localVehicles, ...remoteVehicles];
  } catch (error) {
    console.error('getVehicles Error:', error);
    return localVehicles;
  }
}
