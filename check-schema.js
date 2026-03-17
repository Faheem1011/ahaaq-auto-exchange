const url = 'https://ahhaqautoexchange.net/graphql';

async function checkSchema() {
  const query = `
    query {
      posts(first: 5) {
        nodes {
          id
          title
          categories {
            nodes {
              name
            }
          }
        }
      }
      vehicles: __type(name: "Vehicle") {
        name
      }
      cars: __type(name: "Car") {
        name
      }
      products: __type(name: "Product") {
        name
      }
    }
  `;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkSchema();
