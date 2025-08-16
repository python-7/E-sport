<template>
  <!-- Main dashboard container with dynamic content -->
  <div class="bg-gray-950 text-gray-100 p-6 md:p-10 min-h-[80vh] flex flex-col items-center justify-center text-center">
    <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-green-400">
      Welcome, {{ user?.name || 'User' }}!
    </h1>
    <p class="text-lg text-gray-400 mb-8">
      This is your personal dashboard.
    </p>

    <!-- The AdminPanel component, rendered only if the user is an admin -->
    <div v-if="isAdmin" class="mt-8 w-full max-w-4xl">
      <AdminPanel />
    </div>
    
    <!-- Message for non-admin users -->
    <div v-else class="text-center p-6 rounded-lg bg-gray-800 shadow-md">
      <p class="text-xl font-semibold text-gray-300">You do not have administrative access.</p>
      <p class="text-gray-400 mt-2">Please contact support if you believe this is an error.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../../composables/useAuth';
import AdminPanel from '~/components/AdminPanel.vue';

// Import the authentication middleware
import authMiddleware from '../../../middleware/auth';

definePageMeta({
  middleware: [authMiddleware]
});

const { user, isAdmin } = useAuth();
</script>
