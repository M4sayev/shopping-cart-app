// add artificial network delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let restProducts = [];
export async function fetchProducts() {
  try {
    const url = "./data.json";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    restProducts = await response.json();

    console.log(restProducts);

    await delay(Math.random() * 2000 + 1000);

    return restProducts;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export function renderPrice(price) {
  return price.toFixed(2);
}

export function getRestProducts() {
  return restProducts;
}

async function testFetch() {
  const products = await fetchProducts();
  console.log("Fetched products:", products);
}

testFetch();
