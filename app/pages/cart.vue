<template>
  <!-- Main shopping cart container with dark theme -->
  <div class="bg-gray-900 text-gray-200 min-h-screen p-6 md:p-10">
    <div class="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
      
      <h1 class="text-3xl md:text-4xl font-extrabold text-green-400 mb-6 text-center">
        Shopping Cart
      </h1>

      <!-- Message component for feedback -->
      <div 
        v-if="message" 
        :class="['p-4 rounded-lg text-white font-semibold text-center mb-6', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
      >
        {{ message }}
      </div>

      <!-- Cart is empty state -->
      <div v-if="cartItems.length === 0" class="text-center py-10">
        <p class="text-lg text-gray-400 mb-4">Your cart is currently empty. Start shopping!</p>
        <NuxtLink to="/products">
          <button class="bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors">
            Browse Products
          </button>
        </NuxtLink>
      </div>
      
      <!-- Cart has items state -->
      <div v-else>
        <ul class="mb-6 space-y-4">
          <li 
            v-for="item in cartItems" 
            :key="item.id" 
            class="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md transition-all duration-300"
          >
            <!-- Product details and image preview -->
            <div class="flex items-center space-x-4">
              <img :src="item.imageUrl" :alt="item.name"
                   class="w-16 h-16 object-cover rounded-md shadow-inner border border-gray-600"
                   onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/F9FAFB?text=No+Image';" />
              <div>
                <span class="font-semibold text-lg">{{ item.name }}</span>
                <p class="text-sm text-gray-400">Price: K{{ item.price.toFixed(2) }}</p>
              </div>
            </div>

            <!-- Quantity controls and Remove button -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button 
                  @click="decreaseQuantity(item)"
                  class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-lg transition-colors"
                >
                  -
                </button>
                <span class="font-bold">{{ item.quantity }}</span>
                <button 
                  @click="increaseQuantity(item)"
                  class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-lg transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                @click="removeFromCart(item.id)" 
                class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          </li>
        </ul>

        <!-- Cart Summary and Checkout Button -->
        <div class="border-t border-gray-600 pt-6 mt-6">
          <div class="flex justify-between items-center text-xl font-bold mb-4">
            <span>Total:</span>
            <span>K{{ cartTotal.toFixed(2) }}</span>
          </div>
          <NuxtLink to="/checkout">
            <button class="w-full bg-green-500 hover:bg-green-400 text-gray-950 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors transform hover:scale-105">
              Proceed to Checkout
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId);
    saveCart();
  };
  
  const increaseQuantity = (item) => {
    item.quantity++;
    saveCart();
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      saveCart();
    } else {
      removeFromCart(item.id);
    }
  };


  return {
    cartItems: computed(() => cart.value),
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
};

const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
const message = ref('');
const messageType = ref('');

// Calculate total price of all items in the cart
const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// Helper function to display messages
const setMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 4000);
};

// Function to handle removing an item from the cart with user feedback
const handleRemoveFromCart = (id) => {
  removeFromCart(id);
  setMessage('Item removed from cart.', 'success');
};
</script>
