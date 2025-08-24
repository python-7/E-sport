<template>
  <!-- Main container with a dark background to match the theme -->
  <div class="bg-gray-950 min-h-screen text-gray-200 p-6 md:p-12">
    <!-- Hero Section with a clear value proposition -->
    <div class="text-center py-16 px-4">
      <h1 class="text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-green-400">
        Gear Up Like a Pro!
      </h1>
      <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-400">
        Your ultimate source for custom e-sports jerseys, apparel, and gear. Design your legacy.
      </p>

      <!-- Shop Now button - a primary call to action -->
      <NuxtLink to="/products">
        <button class="bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-3 px-8 rounded-lg shadow-lg
                       transition-all duration-300 transform hover:scale-105">
          Shop Now
        </button>
      </NuxtLink>
    </div>

    <!-- Search Bar Section with improved styling -->
    <div class="my-10 flex flex-col md:flex-row justify-center items-center">
      <input
        type="text"
        placeholder="Search for a Jersey..."
        class="w-full max-w-2xl px-5 py-3 bg-gray-900 border border-gray-700 text-gray-200 rounded-full
               focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 md:mb-0 md:mr-4"
      />
      <button class="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
        Search
      </button>
    </div>
    
    <!-- Jersey Categories Section with a grid layout -->
    <div class="mt-16 text-center">
      <h2 class="text-3xl font-bold mb-8 text-green-400">Shop by Category</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
        <div v-for="category in jerseyCategories" :key="category.name"
             class="cursor-pointer hover:scale-105 transform transition duration-300 group">
          <NuxtLink :to="`/products?category=${encodeURIComponent(category.name)}`" class="block">
            <div class="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-2xl">
              <img :src="category.image" :alt="category.name"
                   class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                   onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/F9FAFB?text=No+Image+Available';" />
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p class="text-xl font-bold text-white tracking-wide uppercase">{{ category.name }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jerseyCategories = [
  // Prefer using images in the public/ folder so they are served as static assets
  { name: 'Football', image: '/images/jerseys/istockphoto-501279095-612x612.jpg' },
  { name: 'Basketball', image: '/images/jerseys/basketball-uniform-jersey.png' },
  { name: 'Baseball', image: '/images/jerseys/blue-arc-sports-jersey-1.webp' },
  { name: 'Hockey', image: '/images/jerseys/images.jpg' },
  { name: 'Soccer', image: '/images/jerseys/optimized-greyblackfront.webp' },
  { name: 'Esports', image: '/images/jerseys/istockphoto-501279095-612x612.jpg' }
];
</script>
