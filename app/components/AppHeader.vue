<template>
  <!-- Main header container with a dark background and a border -->
  <header class="bg-gray-900 text-white shadow-lg border-b-2 border-green-500">
    <!-- Inner container for layout and padding -->
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo or site title on the left -->
      <NuxtLink to="/" class="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors duration-300">
        EsportsGear
      </NuxtLink>

      <!-- Navigation menu on the right -->
      <nav aria-label="Main navigation">
        <ul class="flex items-center space-x-6">
          <!-- Dynamically render navigation links -->
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink 
              :to="link.path"
              class="relative text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide
                     before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px]
                     before:bg-green-500 before:transition-all before:duration-300 before:ease-in-out
                     hover:before:w-full"
              :class="{ 'text-green-400': $route.path === link.path }"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
          
          <!-- Conditional login/logout/dashboard links -->
          <li v-if="!isLoggedIn">
            <NuxtLink to="/login" class="px-4 py-2 rounded-md bg-green-500 text-gray-900 font-bold
                                       hover:bg-green-400 transition-colors duration-300 shadow-md">
              Login
            </NuxtLink>
          </li>
          <li v-if="isLoggedIn">
            <NuxtLink to="/dashboard" class="px-4 py-2 rounded-md bg-gray-700 text-gray-200 font-bold
                                           hover:bg-gray-600 transition-colors duration-300 shadow-md">
              Dashboard
            </NuxtLink>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="px-4 py-2 rounded-md bg-red-600 text-white font-bold
                                         hover:bg-red-500 transition-colors duration-300 shadow-md">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth';
const { isLoggedIn, logout } = useAuth();

// Define navigation links as a data array for easier management
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Customize', path: '/customization' },
  { name: 'Cart', path: '/cart' },
];
</script>
