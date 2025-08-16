<template>
  <!-- Main products container with dark theme -->
  <div class="bg-gray-950 min-h-screen text-gray-200 p-6 md:p-12">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-extrabold text-green-400 mb-4 text-center">
        All Products
      </h1>
      
      <!-- Search Bar and Shop now button -->
      <div class="my-8 flex flex-col md:flex-row justify-center items-center">
        <input
          type="text"
          placeholder="Search for a Jersey..."
          class="w-full max-w-xl px-5 py-3 bg-gray-900 border border-gray-700 text-gray-200 rounded-full
                 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 md:mb-0 md:mr-4"
        />
        <NuxtLink to="/">
          <button class="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
            Back to Home
          </button>
        </NuxtLink>
      </div>

      <p v-if="route.query.category" class="text-lg text-center mb-6 text-gray-400">
        Showing jerseys for category: <span class="font-bold text-green-400">{{ route.query.category }}</span>
      </p>

      <!-- Message display for user feedback -->
      <div 
        v-if="message" 
        :class="['p-4 rounded-lg text-white font-semibold text-center mb-6', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
      >
        {{ message }}
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <div v-for="product in filteredProducts" :key="product.id"
             class="bg-gray-800 rounded-xl shadow-xl overflow-hidden
                    hover:scale-105 transform transition duration-300">
          <NuxtLink :to="`/products/${product.id}`">
            <img :src="product.imageUrl" :alt="product.name"
                 class="w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-110"
                 onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/F9FAFB?text=No+Image+Available';" />
            
            <div class="p-4">
              <h2 class="text-xl font-semibold text-green-400 mb-1">{{ product.name }}</h2>
              <p class="text-gray-400">Price: <span class="font-bold text-lg">${{ product.price }}</span></p>
            </div>
          </NuxtLink>
          <div class="p-4 border-t border-gray-700">
            <button
              @click="addToCart(product)"
              class="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-2 px-4 rounded-lg shadow-lg
                     transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <!-- Fallback message if no products are found -->
      <div v-if="filteredProducts.length === 0" class="text-center py-10">
        <p class="text-lg text-gray-400">No products found in this category. Please try another one!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const products = ref([]);
const route = useRoute();
const message = ref('');
const messageType = ref('');

// A simple useCart composable to handle cart logic
const useCart = () => {
  const cart = ref([]);

  onMounted(() => {
    // Check if localStorage is available (i.e., we are on the client-side)
    if (process.client) {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          cart.value = JSON.parse(storedCart);
        }
      } catch (e) {
        console.error("Failed to load cart from localStorage", e);
      }
    }
  });

  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(cart.value));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    saveCart();
  };

  return {
    cart,
    addToCart,
  };
};

const { addToCart: cartAddToCart } = useCart();

// Helper function to display messages
const setMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 3000);
};

// Function to handle adding a product to the cart
const addToCart = (product) => {
  cartAddToCart(product);
  setMessage(`${product.name} has been added to your cart!`, 'success');
};

onMounted(async () => {
  // Simulating an API call to fetch products. In a real app, this would be a real API endpoint.
  const allProducts = [
    { id: 1, name: 'Cloud9 Pro Jersey', price: 65, category: 'Esports', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Cloud9' },
    { id: 2, name: 'Fnatic 2023 Jersey', price: 60, category: 'Esports', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Fnatic' },
    { id: 3, name: 'T1 Pro Player Jersey', price: 70, category: 'Esports', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=T1' },
    { id: 4, name: 'Team Liquid Jersey', price: 55, category: 'Esports', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Team+Liquid' },
    { id: 5, name: 'Real Madrid Home Kit', price: 90, category: 'Soccer', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Real+Madrid' },
    { id: 6, name: 'Manchester United Away Jersey', price: 85, category: 'Soccer', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Man+U' },
    { id: 7, name: 'Boston Celtics Jersey', price: 110, category: 'Basketball', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Celtics' },
    { id: 8, name: 'LA Lakers Classic Jersey', price: 120, category: 'Basketball', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Lakers' },
    { id: 9, name: 'New York Yankees Jersey', price: 100, category: 'Baseball', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Yankees' },
    { id: 10, name: 'Toronto Blue Jays Jersey', price: 95, category: 'Baseball', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Blue+Jays' },
    { id: 11, name: 'Pittsburgh Penguins Jersey', price: 130, category: 'Hockey', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Penguins' },
    { id: 12, name: 'Chicago Blackhawks Jersey', price: 125, category: 'Hockey', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Blackhawks' },
    { id: 13, name: 'Dallas Cowboys Jersey', price: 150, category: 'Football', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Cowboys' },
    { id: 14, name: 'Green Bay Packers Jersey', price: 145, category: 'Football', imageUrl: 'https://placehold.co/600x400/292B32/9CA3AF?text=Packers' }
  ];
  products.value = allProducts;
});

const filteredProducts = computed(() => {
  const category = route.query.category;
  if (!category) return products.value;
  return products.value.filter(product => product.category?.toLowerCase() === category.toLowerCase());
});
</script>
