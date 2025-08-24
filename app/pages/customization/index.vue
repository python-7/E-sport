<template>
  <!-- Main customization container with modern styling -->
  <div class="bg-gray-900 text-gray-200 rounded-xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto my-8 font-sans">
    
    <!-- View Switcher Buttons -->
    <div class="flex justify-center mb-8 space-x-4">
      <button 
        @click="currentView = 'customizer'"
        :class="['px-6 py-3 rounded-xl font-bold transition-all duration-300', 
                 currentView === 'customizer' ? 'bg-green-500 text-gray-900 shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        Customize Jersey
      </button>
      <button 
        @click="currentView = 'cart'"
        :class="['relative px-6 py-3 rounded-xl font-bold transition-all duration-300',
                 currentView === 'cart' ? 'bg-green-500 text-gray-900 shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        Shopping Cart ({{ cartItems.length }})
        <span 
          v-if="cartItems.length > 0"
          class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce"
        >
          {{ cartItems.length }}
        </span>
      </button>
    </div>
    
    <!-- Message Component -->
    <div 
      v-if="message" 
      :class="['p-3 rounded-lg text-white mb-6 text-center', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
    >
      {{ message }}
    </div>

    <!-- Conditional Rendering for Views -->
    <div v-if="currentView === 'customizer'">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-6 text-green-400 text-center">
        Create Your Custom Jersey
      </h1>
      <p class="mb-8 text-center text-gray-400">
        Choose your colors, text, and number!
      </p>

      <!-- Grid layout for preview and controls -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- Jersey Preview Section -->
        <div class="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-inner border border-gray-700">
          <h3 class="text-xl font-bold mb-4">Jersey Preview</h3>
          <div 
            class="relative w-full h-80 overflow-hidden rounded-lg shadow-lg border-4 border-gray-700 transition-all duration-300" 
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
            Total: K{{ totalPrice.toFixed(2) }}
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
        </form>
      </div>
    </div>

    <!-- Shopping Cart View -->
    <div v-else>
      <h1 class="text-3xl md:text-4xl font-extrabold mb-6 text-green-400 text-center">
        Shopping Cart
      </h1>
      <p v-if="cartItems.length === 0" class="text-center text-gray-400 mb-4">Your cart is currently empty. Start customizing!</p>
      <div v-else class="space-y-4">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="p-4 rounded-xl shadow-md bg-gray-800 flex flex-col sm:flex-row justify-between items-center sm:items-start"
        >
          <div class="flex-grow flex items-center mb-4 sm:mb-0">
            <img :src="item.imageUrl" :alt="item.name"
                 class="w-16 h-16 object-cover rounded-md shadow-inner border border-gray-600 mr-4"
                 onerror="this.onerror=null;this.src='https://placehold.co/600x400/1F2937/F9FAFB?text=No+Image';" />
            <div>
              <p class="font-bold text-lg text-gray-100">{{ item.name }}</p>
              <p class="text-sm text-gray-400">Price: K{{ item.price.toFixed(2) }}</p>
            </div>
          </div>
          <button 
            @click="handleRemoveFromCart(item.id)" 
            class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
        <div class="text-right mt-6">
          <NuxtLink to="/checkout">
            <button class="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors">
              Proceed to Checkout
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';

// Use cart logic from previous Canvas
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
  
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId);
    saveCart();
  };

  return {
    cartItems: computed(() => cart.value),
    addToCart,
    removeFromCart,
  };
};

const { cartItems, addToCart, removeFromCart } = useCart();

// --- Reactive State for Page View and Customization Form ---
const currentView = ref('customizer');
const message = ref('');
const messageType = ref('');

const jerseyColor = ref('#1F2937'); // Default to a dark gray
const jerseyText = ref('');
const jerseyNumber = ref(null);
const jerseyTextColor = ref('#FFFFFF'); // Default to white

// --- Price Calculation ---
const basePrice = 150.00;
const customizationFee = 5.00;
const totalPrice = computed(() => {
  let price = basePrice;
  if (jerseyText.value || jerseyNumber.value !== null) {
    price += customizationFee;
  }
  return price;
});

// --- Function to Add to Cart ---
const handleAddToCart = () => {
  // Create a unique ID for the customized item
  const itemId = `custom-${Date.now()}`;
  const newItem = {
    id: itemId,
    name: `Custom Jersey${jerseyText.value ? ` - ${jerseyText.value}` : ''}`,
    price: totalPrice.value,
    imageUrl: `https://placehold.co/600x400/${jerseyColor.value.substring(1)}/${jerseyTextColor.value.substring(1)}?text=${jerseyText.value || 'Custom'}`,
    customization: {
      color: jerseyColor.value,
      number: jerseyNumber.value,
      text: jerseyText.value,
      textColor: jerseyTextColor.value,
    },
  };
  
  addToCart(newItem);
  setMessage('Item added to cart successfully!', 'success');
  currentView.value = 'cart'; // Switch to cart view after adding
};

// --- Function to Remove from Cart ---
const handleRemoveFromCart = (id) => {
  removeFromCart(id);
  setMessage('Item removed from cart.', 'success');
};

// --- Helper for showing messages ---
function setMessage(msg, type) {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 4000);
}

// Watch for changes in the message to clear it after a delay
let messageTimer = null;
watch(message, (newMessage) => {
  if (newMessage) {
    if (messageTimer) {
      clearTimeout(messageTimer);
    }
    messageTimer = setTimeout(() => {
      message.value = '';
      messageType.value = '';
    }, 3000);
  }
});
</script>
