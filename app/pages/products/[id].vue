<template>
  <!-- Main product page container with dynamic background and padding -->
  <div class="bg-gray-900 text-gray-200 min-h-screen p-6 md:p-10">
    <div v-if="product" class="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden md:flex">
      <!-- Product Image Section -->
      <div class="md:flex-shrink-0 md:w-1/2 p-4 flex items-center justify-center">
        <!-- Mock Image placeholder, in a real app this would be a real image -->
        <div class="w-full h-80 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 font-bold text-2xl">
          
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="p-8 flex flex-col justify-center md:w-1/2">
        <h1 class="text-3xl md:text-4xl font-extrabold text-green-400 mb-2">
          {{ product.name }}
        </h1>
        <p class="text-xl text-gray-300 font-semibold mb-4">
          ${{ product.price.toFixed(2) }}
        </p>
        <p class="text-gray-400 leading-relaxed mb-6">
          {{ product.description }}
        </p>

        <!-- Dynamic Customization/Buy Buttons -->
        <div class="mt-auto space-y-4">
          <NuxtLink :to="'/customization'">
            <button class="w-full bg-green-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg
                           hover:bg-green-400 transition-colors duration-300 transform hover:scale-105">
              Customize & Buy
            </button>
          </NuxtLink>
          <NuxtLink to="/products">
            <button class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md
                           transition-colors duration-300">
              Back to All Products
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Loading and Not Found states -->
    <div v-else class="text-center p-8">
      <p class="text-gray-400 text-lg">Loading product details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);

// Mock product data to simulate an API call
const mockProducts = [
  {
    id: 'esports-jersey',
    name: 'Official Team Jersey',
    price: 69.99,
    description: 'A high-performance jersey designed for competitive gaming. Featuring moisture-wicking fabric and a comfortable fit. Customize it with your name and number.'
  },
  {
    id: 'gaming-hoodie',
    name: 'Esports Gaming Hoodie',
    price: 89.99,
    description: 'Stay warm and in style with this premium gaming hoodie. Made from soft, durable material, perfect for long gaming sessions or everyday wear.'
  }
];

// Fetch product details based on the route parameter
onMounted(() => {
  // In a real application, you would make an API call here:
  // product.value = await $fetch(`/api/products/${route.params.id}`);

  // For now, we'll find the product from our mock data
  product.value = mockProducts.find(p => p.id === route.params.id);
});
</script>
