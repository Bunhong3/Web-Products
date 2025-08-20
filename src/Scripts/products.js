let products = [];
    let displayedProducts = 0;
    const productsPerLoad = 8;

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            displayProducts();
            console.log(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            document.getElementById('products-container').innerHTML = 
                '<p class="text-center text-red-500 col-span-4">Failed to load products. Please try again later.</p>';
        }
    }

    function displayProducts(filteredProducts = products) {
        const productsContainer = document.getElementById('products-container');
        const nextProducts = filteredProducts.slice(displayedProducts, displayedProducts + productsPerLoad);
        
        if (displayedProducts === 0) {
            productsContainer.innerHTML = '';
        }
        
        nextProducts.forEach(product => {
            const productImage = product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/300';

            const productElement = document.createElement('div');
            productElement.className = 'bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';
            productElement.innerHTML = `
                <div class="h-56 overflow-hidden">
                    <img src="${productImage}" alt="${product.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="font-semibold text-lg mb-2 truncate">${product.title}</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-primary text-xl">$${product.price}</span>
                        <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-300">Add to Cart</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
        
        displayedProducts += nextProducts.length;
        if (displayedProducts >= filteredProducts.length) {
            document.getElementById('load-more').classList.add('hidden');
        } else {
            document.getElementById('load-more').classList.remove('hidden');
        }
    }

    document.getElementById('load-more').addEventListener('click', displayProducts);

    document.getElementById('getAll').addEventListener('click', function() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    displayedProducts = 0;

    while (displayedProducts < products.length) {
        displayProducts();
    }
    document.getElementById('load-more').classList.add('hidden');
    });

    document.getElementById('sort-price').addEventListener('change', function(event) {
        const sortValue = event.target.value;

        if (sortValue === 'low-to-high') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-to-low') {
            products.sort((a, b) => b.price - a.price);
        } else {
            products.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        displayedProducts = 0;
        displayProducts();
    });
    document.getElementById('filter-clothing').addEventListener('click', function() {
        const filteredProducts = products.filter(product => product.category === "men's clothing" || product.category === "women's clothing");
        displayedProducts = 0;
        displayProducts(filteredProducts);
        document.getElementById('load-more').classList.add('hidden');
    });

    document.getElementById('filter-electronics').addEventListener('click', function() {
        const filteredProducts = products.filter(product => product.category === 'electronics');
        displayedProducts = 0;
        displayProducts(filteredProducts);
        document.getElementById('load-more').classList.add('hidden');
    });

    document.getElementById('filter-jewelery').addEventListener('click', function() {
        const filteredProducts = products.filter(product => product.category === 'jewelery');
        displayedProducts = 0;
        displayProducts(filteredProducts);
        document.getElementById('load-more').classList.add('hidden');
    });
    document.getElementById('load-more').addEventListener('click', function () {
    displayProducts();
    });
    document.addEventListener('DOMContentLoaded', function() {
        fetchProducts();
    });
