


async function test() {
  try {
    const res = await fetch("https://backend.ahhaqautoexchange.net/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetVehicles {
            vehicles(first: 2) {
              nodes {
                id
                title
                slug
                vehicleDetails {
                  price
                }
              }
            }
          }
        `
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error("Fetch failed", e);
  }
}
test();
