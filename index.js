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
      const products = [
        {
          name: "Casual T-Shirt",
          brand: "Urban Outfitters",
          price: 25.99,
          size: "M",
          color: "White",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Denim Jacket",
          brand: "Levi's",
          price: 89.99,
          size: "L",
          color: "Blue",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Athletic Hoodie",
          brand: "Nike",
          price: 59.99,
          size: "XL",
          color: "Black",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Floral Dress",
          brand: "Zara",
          price: 45.99,
          size: "S",
          color: "Red",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Slim Fit Jeans",
          brand: "H&M",
          price: 34.99,
          size: "32",
          color: "Dark Blue",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Puffer Jacket",
          brand: "North Face",
          price: 129.99,
          size: "L",
          color: "Green",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Graphic Tee",
          brand: "Adidas",
          price: 29.99,
          size: "M",
          color: "Gray",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Classic Polo",
          brand: "Ralph Lauren",
          price: 79.99,
          size: "L",
          color: "Navy",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Track Pants",
          brand: "Puma",
          price: 44.99,
          size: "M",
          color: "Black",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Leather Jacket",
          brand: "All Saints",
          price: 249.99,
          size: "XL",
          color: "Brown",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Oversized Sweater",
          brand: "Uniqlo",
          price: 39.99,
          size: "L",
          color: "Beige",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Pleated Skirt",
          brand: "Mango",
          price: 49.99,
          size: "S",
          color: "Pink",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Running Shorts",
          brand: "Under Armour",
          price: 24.99,
          size: "M",
          color: "Gray",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Yoga Leggings",
          brand: "Lululemon",
          price: 98.99,
          size: "M",
          color: "Black",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Long Sleeve Shirt",
          brand: "Gap",
          price: 29.99,
          size: "M",
          color: "White",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Bomber Jacket",
          brand: "Alpha Industries",
          price: 119.99,
          size: "XL",
          color: "Olive",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Cargo Pants",
          brand: "Carhartt",
          price: 59.99,
          size: "L",
          color: "Khaki",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Summer Dress",
          brand: "Forever 21",
          price: 29.99,
          size: "S",
          color: "Yellow",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Formal Blazer",
          brand: "Calvin Klein",
          price: 199.99,
          size: "L",
          color: "Black",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Cotton Chinos",
          brand: "Dockers",
          price: 54.99,
          size: "34",
          color: "Tan",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Raincoat",
          brand: "Columbia",
          price: 74.99,
          size: "L",
          color: "Yellow",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Graphic Sweatshirt",
          brand: "Champion",
          price: 49.99,
          size: "M",
          color: "Red",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Straight Leg Pants",
          brand: "Theory",
          price: 129.99,
          size: "32",
          color: "Black",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Button-Up Shirt",
          brand: "Brooks Brothers",
          price: 79.99,
          size: "L",
          color: "Light Blue",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Cozy Cardigan",
          brand: "Anthropologie",
          price: 89.99,
          size: "M",
          color: "Cream",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Wool Coat",
          brand: "J.Crew",
          price: 199.99,
          size: "L",
          color: "Gray",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Printed Maxi Dress",
          brand: "ASOS",
          price: 69.99,
          size: "M",
          color: "Multicolor",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "High-Waisted Shorts",
          brand: "Topshop",
          price: 34.99,
          size: "S",
          color: "Denim",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Tank Top",
          brand: "Abercrombie",
          price: 14.99,
          size: "M",
          color: "Blue",
          image: "https://picsum.photos/200/200?grayscale",
        },
        {
          name: "Workout Tank",
          brand: "Reebok",
          price: 19.99,
          size: "L",
          color: "Purple",
          image: "https://picsum.photos/200/200?grayscale",
        },
      ];

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
                        <div class="price">${product.price}</div>
                    </div>
                </div>
            `
          )
          .join("");
      }

      // Initialize the page
      document.addEventListener("DOMContentLoaded", () => {
        renderProducts(products);

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
        document
          .querySelector(".filter-apply")
          .addEventListener("click", () => {
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
                selectedSizes.length === 0 ||
                selectedSizes.includes(product.size);
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
          button.addEventListener("click", () =>
            button.classList.toggle("selected")
          );
        });

        document.querySelectorAll(".color-option").forEach((colorDiv) => {
          colorDiv.addEventListener("click", () =>
            colorDiv.classList.toggle("selected")
          );
        });
      });