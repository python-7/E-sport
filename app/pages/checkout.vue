<template>
  <!-- Main checkout container with dark theme and padding -->
  <div class="bg-gray-900 text-gray-200 min-h-screen p-6 md:p-10">
    <div class="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">

      <h1 class="text-3xl md:text-4xl font-extrabold text-green-400 mb-6 text-center">
        Checkout
      </h1>

      <!-- Order Summary Section -->
      <div class="mb-8 p-6 bg-gray-700 rounded-lg shadow-inner">
        <h2 class="text-2xl font-bold mb-4 text-green-400">Order Summary</h2>
        <ul class="mb-4 space-y-2">
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 rounded-md"
                :style="{ backgroundColor: item.color }"
              ></div>
              <span class="font-semibold text-lg">{{ item.text }} - #{{ item.number }}</span>
            </div>
            <span class="text-gray-400">K{{ item.price.toFixed(2) }}</span>
          </li>
        </ul>
        <div class="border-t border-gray-600 pt-4 mt-4 flex justify-between items-center text-xl font-bold">
          <span>Subtotal:</span>
          <span>K{{ cartTotal.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Checkout Form Section -->
      <form @submit.prevent="placeOrder" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4 text-green-400">Shipping Information</h2>
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-300">Full Name</label>
          <input
            id="fullName"
            type="text"
            v-model="formData.fullName"
            class="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-300">Address</label>
          <input
            id="address"
            type="text"
            v-model="formData.address"
            class="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <h2 class="text-2xl font-bold mb-4 pt-4 text-green-400">Payment Details</h2>
        <div>
          <label for="card" class="block text-sm font-medium text-gray-300">Credit Card Number</label>
          <input
            id="card"
            type="text"
            v-model="formData.cardNumber"
            class="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <!-- Place Order Button and Success Message -->
        <button
          type="submit"
          class="w-full bg-green-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-400 transition-colors duration-300 transform hover:scale-105"
        >
          Place Order
        </button>

        <div v-if="orderPlaced" class="mt-6 p-4 bg-green-500 text-white font-bold rounded-lg text-center">
          Order placed successfully!
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../composables/useCart';
import { useRouter } from 'vue-router';

const { cartItems } = useCart();
const router = useRouter();

const formData = ref({
  fullName: '',
  address: '',
  cardNumber: '',
});

const orderPlaced = ref(false);

// Calculate total price of all items in the cart
const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price, 0);
});

// Function to handle order placement
const placeOrder = async () => {
  // In a real application, you would send this data to your backend API
  console.log('Placing order with data:', formData.value, 'and items:', cartItems.value);
  
  // Clear the cart after a successful order
  cartItems.value = [];
  orderPlaced.value = true;
  
  // Navigate back to the homepage after a delay
  setTimeout(() => {
    orderPlaced.value = false;
    router.push('/');
  }, 3000);
};
</script>
