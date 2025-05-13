let api = "https://fakestoreapi.com/products";
let container = document.querySelector(".card-contanier");
let sortSelect = document.querySelector("#sort-select");
let categorySelect = document.querySelector("#category-select");
let searchInput = document.querySelector("#search-input");
let loader = document.querySelector(".loader");
let products = [];
async function fetchProducts() {
  try {
    loader.style.display = "block";
    let response = await fetch(api);
    let data = await response.json();
    products = data;
    renderProducts(products);
  } catch (error) {
    console.error(error.message);
  } finally {
    loader.style.display = "none";
  }
}
function renderProducts(productList) {
  container.innerHTML = "";
  productList.map((product) => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="img-contanier">
        <img src="${product.image}" class="img" alt="${product.title}">
      </div>
      <p class="title">${product.title}</p>
      <p class="category">Kategoriya: ${product.category}</p>
      <p class="price">Narxi: $${product.price}</p>
    `;

    container.append(card);
  });
}
sortSelect.addEventListener("change", () => {
  let sortedProducts = [...products];
  if (sortSelect.value === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(sortedProducts);
});
categorySelect.addEventListener("change", () => {
  let filteredProducts = products.filter((product) => {
    return (
      categorySelect.value === "all" ||
      product.category === categorySelect.value
    );
  });
  filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
  renderProducts(filteredProducts);
});
searchInput.addEventListener("input", () => {
  let searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderProducts(searchedProducts);
});
fetchProducts();
