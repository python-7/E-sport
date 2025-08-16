<template>
  <!-- The main layout container, now with a dark background to match the header -->
  <div class="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans">
    
    <!-- The new, modular header component -->
    <AppHeader />
    
    <!-- Main content area -->
    <main class="flex-grow container mx-auto p-4 md:p-8">
      <slot />
    </main>
    
    <!-- A simple footer can be added here if needed -->
    <!-- <footer class="bg-gray-900 text-center py-4 text-gray-500">
      © 2024 EsportsGear. All Rights Reserved.
    </footer> -->
    
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
</script>
