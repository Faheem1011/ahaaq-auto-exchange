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

export async function getVehicles(first = 10) {
  const query = `
    query GetVehicles($first: Int!) {
      vehicles(first: $first) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          vehicleDetails {
            make
            model
            year
            price
            mileage
            vin
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { first });
  return data?.vehicles?.nodes || [];
}
