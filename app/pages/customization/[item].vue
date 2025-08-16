<template>
  <!-- Main customization container with modern styling -->
  <div class="bg-gray-900 text-gray-200 rounded-xl shadow-2xl p-6 md:p-10">
    <h1 class="text-3xl md:text-4xl font-extrabold mb-6 text-green-400">Customize Your Jersey</h1>
    <p class="text-gray-400 mb-8">Personalize your gear to represent your team and style!</p>
    
    <!-- Grid layout for preview and controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Jersey Preview Section -->
      <div class="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
        <h3 class="text-xl font-bold mb-4">Jersey Preview</h3>
        <div 
          class="relative w-64 h-80 overflow-hidden rounded-lg shadow-lg border-4 border-gray-700 transition-all duration-300" 
          :style="{ backgroundColor: jerseyColor }"
        >
          <!-- Fictional jersey design elements -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          
          <!-- Jersey name text -->
          <div class="absolute top-1/4 left-0 w-full text-center">
            <span class="text-2xl font-bold uppercase" :style="{ color: jerseyTextColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }">
              {{ jerseyText }}
            </span>
          </div>

          <!-- Jersey number -->
          <div class="absolute bottom-1/4 left-0 w-full text-center">
            <span class="text-5xl font-extrabold" :style="{ color: jerseyTextColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }">
              {{ jerseyNumber }}
            </span>
          </div>
        </div>

        <!-- Dynamic Price Display -->
        <div class="mt-6 text-2xl font-bold text-green-400">
          Total: ${{ totalPrice.toFixed(2) }}
        </div>
      </div>

      <!-- Customization Form Section -->
      <form @submit.prevent="handleAddToCart" class="flex flex-col space-y-6">
        <div>
          <label for="jersey-text" class="block text-sm font-medium text-gray-400 mb-1">Custom Name:</label>
          <input 
            id="jersey-text" 
            type="text" 
            v-model="jerseyText" 
            placeholder="Enter a name (e.g., 'PLAYER ONE')" 
            maxlength="15"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
          >
        </div>
        
        <div>
          <label for="jersey-number" class="block text-sm font-medium text-gray-400 mb-1">Jersey Number:</label>
          <input 
            id="jersey-number" 
            type="number" 
            v-model.number="jerseyNumber" 
            placeholder="Enter a number (e.g., '23')" 
            min="0"
            max="99"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
          >
        </div>
        
        <div>
          <label for="jersey-color" class="block text-sm font-medium text-gray-400 mb-1">Jersey Color:</label>
          <input id="jersey-color" type="color" v-model="jerseyColor" class="h-12 w-full rounded-md border-none cursor-pointer">
        </div>
        
        <div>
          <label for="text-color" class="block text-sm font-medium text-gray-400 mb-1">Text Color:</label>
          <input id="text-color" type="color" v-model="jerseyTextColor" class="h-12 w-full rounded-md border-none cursor-pointer">
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-green-500 text-gray-950 font-bold py-3 px-6 rounded-lg shadow-lg
                 hover:bg-green-400 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add to Cart
        </button>
        
        <!-- Message box for user feedback -->
        <div v-if="message" class="mt-4 p-3 rounded-md text-center" :class="messageClass">
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// A simple useCart composable to handle cart logic, copied from the cart-refactor Canvas
const useCart = () => {
  const cart = ref([]);

  onMounted(() => {
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
    cartItems: computed(() => cart.value),
    addToCart,
  };
};

const { addToCart: cartAddToCart } = useCart();

// --- Reactive State ---
const jerseyColor = ref('#1F2937'); // Default to a dark gray
const jerseyText = ref('');
const jerseyNumber = ref(null);
const jerseyTextColor = ref('#FFFFFF'); // Default to white

const basePrice = 50.00;
const customizationFee = 5.00;
const message = ref('');
const messageClass = ref('');

// --- Computed Property for Price ---
const totalPrice = computed(() => {
  let price = basePrice;
  // Add customization fee if either text or number is customized
  if (jerseyText.value || jerseyNumber.value !== null) {
    price += customizationFee;
  }
  return price;
});

// --- Method to Add to Cart ---
function handleAddToCart() {
  const customizedProduct = {
    id: `custom-${Date.now()}`, // Create a unique ID for the customized item
    name: `Custom Jersey${jerseyText.value ? ` - ${jerseyText.value}` : ''}`,
    price: totalPrice.value,
    imageUrl: `https://placehold.co/600x400/${jerseyColor.value.substring(1)}/FFFFFF?text=${jerseyText.value || 'Custom'}`,
    // Include additional customization details for potential future use
    customization: {
      color: jerseyColor.value,
      text: jerseyText.value,
      number: jerseyNumber.value,
      textColor: jerseyTextColor.value,
    }
  };
  
  cartAddToCart(customizedProduct);

  // Display success message
  setMessage('Item added to cart!', 'bg-green-500 text-white');
}

// --- Helper for showing messages ---
function setMessage(msg, cls) {
  message.value = msg;
  messageClass.value = cls;
  // Clear the message after a few seconds
  setTimeout(() => {
    message.value = '';
    messageClass.value = '';
  }, 4000);
}
</script>
