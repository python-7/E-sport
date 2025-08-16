<template>
  <!-- Main container with dark background and centered content -->
  <div class="bg-gray-950 min-h-screen text-gray-200 p-6 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-green-400">Create a New Account</h1>

      <!-- Message display for user feedback -->
      <div 
        v-if="message" 
        :class="['p-4 rounded-lg text-white font-semibold text-center mb-6', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
      >
        {{ message }}
      </div>
      
      <form @submit.prevent="handleRegistration" class="space-y-6">
        <!-- Username Field -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300">Username:</label>
          <input 
            id="username" 
            type="text" 
            placeholder="Choose a username" 
            v-model="username"
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
        </div>
        
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email:</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Enter your email address" 
            v-model="email"
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
        </div>
        
        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password:</label>
          <input 
            id="password" 
            type="password" 
            placeholder="Choose a password" 
            v-model="password"
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
        </div>
        
        <!-- Password Confirmation Field -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm Password:</label>
          <input 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm your password" 
            v-model="confirmPassword"
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
        </div>
        
        <!-- Register Button with dynamic state -->
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-3 px-4 rounded-lg shadow-lg
                 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Registering...</span>
          <span v-else>Register</span>
        </button>
      </form>
      
      <!-- Login Link -->
      <p class="mt-6 text-sm text-center text-gray-400">
        Already have an account? 
        <NuxtLink to="/login" class="text-green-500 hover:underline font-semibold">
          Log in here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const message = ref('');
const messageType = ref('');
const loading = ref(false);

// Helper function to display messages
const setMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 4000);
};

// Function to handle the registration process
async function handleRegistration() {
  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    setMessage('Please fill in all fields.', 'error');
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    setMessage('Passwords do not match.', 'error');
    return;
  }
  
  loading.value = true;

  // Simulate an API call for registration
  try {
    const mockUser = {
      id: `user-${Date.now()}`,
      username: username.value,
      email: email.value,
      // In a real app, you would not store passwords in plain text
    };

    // Simulate a successful registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage('Account created successfully! Redirecting to login...', 'success');

    // Redirect to the login page after a short delay
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (error) {
    setMessage('Registration failed. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
}
</script>
