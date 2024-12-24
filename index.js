// Toggle between explore and search pages
function toggleView(view) {
  const exploreGrid = document.querySelector(".explore-grid");
  const searchResults = document.querySelector(".search-results");
  const sidebar = document.querySelector(".sidebar");
  const filterSidebar = document.querySelector(".filter-sidebar");

  if (view === "explore") {
    exploreGrid.style.display = "grid";
    searchResults.style.display = "none";
    sidebar.style.display = "block";
    filterSidebar.style.display = "none";
  } else if (view === "search") {
    exploreGrid.style.display = "none";
    searchResults.style.display = "block";
    sidebar.style.display = "none";
    filterSidebar.style.display = "block";
  }
}
// Sample product data
let products = [];
let exploredProducts = [];

// Fetch products
fetch("./product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data.map((item, index) => ({ id: index + 1, ...item })); // Add unique IDs
    renderProducts(products); // Call render function after loading
  })
  .catch((error) => console.error("Error loading products:", error));

// Fetch explored products
fetch("./explore.json")
  .then((response) => response.json())
  .then((data) => {
    exploredProducts = data.map((item, index) => ({ id: index + 1, ...item })); // Add unique IDs
    renderExplore(exploredProducts); // Call render function after loading
  })
  .catch((error) => console.error("Error loading explored products:", error));

// Render products
function renderProducts(products = []) {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = products
    .map(
      (product) => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <div class="product-details">
                          <div class="price">${product.price}</div>
                          <button class="add-to-cart" id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.id;
      const product = products.find((p) => p.id == productId);
      addToCart(product);
    });
  });
}

function renderExplore(products = []) {
  const productList = document.querySelector(".explore-grid");

  // Check if the container exists
  if (!productList) {
    console.error("Explore grid element not found!");
    return;
  }

  // Render product cards
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h4>${product.name}</h4>
            <div class="product-details">
              <div class="price">$${product.price}</div>
              <button class="add-to-cart" id="${product.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  // Attach event listeners
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    console.log("button", products);
    button.addEventListener("click", (e) => {
      const productId = e.target.id; // or `getAttribute("id")`
      const product = products.find((p) => p.id == productId);
      if (product) {
        console.log("Product added to cart:", product);
        addToCart(product);
      } else {
        console.error("Product not found!", productId);
      }
    });
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product} has been added to your cart!`);
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  renderExplore(exploredProducts);
  console.log("///////////////////");
  // Add search functionality
  const searchInput = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-btn");
  const filterApply = document.querySelector(".filter-apply");

  searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim().length > 0) {
      toggleView("search");
    }
  });

  // Allow search on Enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim().length > 0) {
      toggleView("search");
    }
  });

  // Apply filters
  productsToBeFiltered = products;
  document.querySelector(".search-btn").addEventListener("click", () => {
    searchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    productsToBeFiltered = searchedProducts;
    renderProducts(searchedProducts);
  });

  document.querySelector(".filter-apply").addEventListener("click", () => {
    // Get selected brands
    const selectedBrands = Array.from(
      document.querySelectorAll(".brand-list input:checked")
    ).map((checkbox) => checkbox.id);

    // Get selected sizes
    const selectedSizes = Array.from(
      document.querySelectorAll(".size-btn.selected")
    ).map((button) => button.textContent);

    // Get selected colors
    const selectedColors = Array.from(
      document.querySelectorAll(".color-option.selected")
    ).map((colorDiv) => colorDiv.style.background);

    // Filter products
    const filteredProducts = productsToBeFiltered.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand.toLowerCase());
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.includes(product.size);
      const matchesColor =
        selectedColors.length === 0 ||
        selectedColors.includes(product.color.toLowerCase());

      return matchesBrand && matchesSize && matchesColor;
    });

    // Display filtered products (you can replace this with your rendering logic)
    renderProducts(filteredProducts);
  });

  // Add event listeners for size and color selection
  document.querySelectorAll(".size-btn").forEach((button) => {
    button.addEventListener("click", () => button.classList.toggle("selected"));
  });

  document.querySelectorAll(".color-option").forEach((colorDiv) => {
    colorDiv.addEventListener("click", () =>
      colorDiv.classList.toggle("selected")
    );
  });
});
{
  document.querySelector("#men").addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();

    productsToBeFiltered = exploredProducts;
    const menProducts = productsToBeFiltered.filter(
      (product) => product.gender == "Men"
    );
    renderExplore(menProducts);
  });
  document.querySelector("#women").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const womenProducts = productsToBeFiltered.filter(
      (product) => product.gender == "Women"
    );
    renderExplore(womenProducts);
  });

  document.querySelector("#tops").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const topProducts = productsToBeFiltered.filter(
      (product) => product.type == "Top"
    );
    renderExplore(topProducts);
  });
  document.querySelector("#shoes").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const shoesProducts = productsToBeFiltered.filter(
      (product) => product.type == "Shoes"
    );
    renderExplore(shoesProducts);
  });

  document.querySelector("#bottoms").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const bottomsProducts = productsToBeFiltered.filter(
      (product) => product.type == "Bottom"
    );
    renderExplore(bottomsProducts);
  });

  document.querySelector("#accessories").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const accessoriesProducts = productsToBeFiltered.filter(
      (product) => product.type == "Accessories"
    );
    renderExplore(accessoriesProducts);
  });

  document.querySelector("#kemis").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const KemisProducts = productsToBeFiltered.filter(
      (product) => product.type == "kemis"
    );
    console.log("KemisProducts", KemisProducts);
    renderExplore(KemisProducts);
  });

  document.querySelector("#sale").addEventListener("click", (e) => {
    e.preventDefault();
    productsToBeFiltered = exploredProducts;
    const saleProducts = productsToBeFiltered.filter(
      (product) => product.onSale
    );
    renderExplore(saleProducts);
  });
}
