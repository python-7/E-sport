<template>
  <!-- Main container with dark background and centered content -->
  <div class="bg-gray-950 min-h-screen text-gray-200 p-6 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto p-8 bg-gray-800 rounded-xl shadow-2xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-green-400">Login to Your Account</h1>
      
      <!-- Message display for user feedback -->
      <div 
        v-if="message" 
        :class="['p-4 rounded-lg text-white font-semibold text-center mb-6', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
      >
        {{ message }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Username Field -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300">Username:</label>
          <input 
            id="username" 
            type="text" 
            placeholder="Your username" 
            v-model="username"
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
            placeholder="Your password" 
            v-model="password"
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
        </div>
        
        <!-- Role Selection -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-300">Login as:</label>
          <select 
            id="role" 
            v-model="selectedRole" 
            class="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <!-- Login Button with dynamic state -->
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-3 px-4 rounded-lg shadow-lg
                 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Logging In...</span>
          <span v-else>Log In</span>
        </button>
      </form>
      
      <!-- Registration Link -->
      <p class="mt-6 text-sm text-center text-gray-400">
        Don't have an account? 
        <NuxtLink to="/register" class="text-green-500 hover:underline font-semibold">
          Register here
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const { login } = useAuth();
const router = useRouter();

const username = ref('');
const password = ref('');
const selectedRole = ref('user');
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

// Function to handle the login process
async function handleLogin() {
  if (!username.value || !password.value) {
    setMessage('Please enter both username and password.', 'error');
    return;
  }
  
  loading.value = true;
  
  // Simulate an API call
  try {
    const mockUser = {
      id: `user-${Date.now()}`,
      name: username.value,
      role: selectedRole.value,
    };
    
    // Simulate a successful login
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(mockUser);
    
    setMessage(`Logged in as a ${selectedRole.value}.`, 'success');
    
    // Redirect to the dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  } catch (error) {
    setMessage('Login failed. Please check your credentials.', 'error');
  } finally {
    loading.value = false;
  }
}
</script>
