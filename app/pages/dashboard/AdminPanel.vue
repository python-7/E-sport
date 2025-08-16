<template>
  <!-- Main Admin Panel container with dark theme -->
  <div class="bg-gray-800 text-gray-200 rounded-xl shadow-2xl p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
    
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-green-400">Admin Panel</h2>
      <p class="mt-2 text-gray-400">Manage your store's products and orders.</p>
    </div>
    
    <!-- Tabbed navigation for different admin sections -->
    <div class="flex justify-center mb-6 space-x-4">
      <button 
        @click="currentTab = 'products'" 
        :class="['px-6 py-3 rounded-xl font-bold transition-all duration-300', 
                 currentTab === 'products' ? 'bg-green-500 text-gray-900 shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        Products
      </button>
      <button 
        @click="currentTab = 'orders'" 
        :class="['px-6 py-3 rounded-xl font-bold transition-all duration-300',
                 currentTab === 'orders' ? 'bg-green-500 text-gray-900 shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        Orders
      </button>
    </div>
    
    <!-- Message Component for feedback -->
    <div 
      v-if="message" 
      :class="['p-4 rounded-lg text-white font-semibold text-center', messageType === 'error' ? 'bg-red-500' : 'bg-green-500']"
    >
      {{ message }}
    </div>

    <!-- Products Tab Content -->
    <div v-if="currentTab === 'products'">
      <div class="bg-gray-700 rounded-lg p-6 shadow-inner">
        <h3 class="text-xl font-bold mb-4 text-green-400">Manage Products</h3>
        
        <!-- Product Creation Form -->
        <form @submit.prevent="addProduct" class="space-y-4 mb-8">
          <input v-model="name" placeholder="Product Name" class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          <input v-model="imageUrl" placeholder="Image URL" class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          <input v-model.number="price" type="number" placeholder="Price" class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          <input v-model="category" placeholder="Category" class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          <button type="submit" class="w-full bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-md shadow-lg hover:bg-green-400 transition-colors duration-300">
            Add Product
          </button>
        </form>
        
        <!-- Current Products List -->
        <h3 class="text-lg font-bold mb-2 text-gray-200">Current Products</h3>
        <div v-if="products.length === 0" class="text-center text-gray-400 py-4">No products found.</div>
        <ul v-else class="space-y-4">
          <li v-for="product in products" :key="product.id" class="flex items-center justify-between p-4 bg-gray-800 rounded-md border border-gray-600">
            <div>
              <p class="text-lg font-bold">{{ product.name }}</p>
              <p class="text-sm text-gray-400">${{ product.price.toFixed(2) }}</p>
            </div>
            <button @click="removeProduct(product.id)" class="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-500 transition-colors">
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Orders Tab Content -->
    <div v-else>
      <div class="bg-gray-700 rounded-lg p-6 shadow-inner">
        <h3 class="text-xl font-bold mb-4 text-green-400">User Orders</h3>
        <div v-if="orders.length === 0" class="text-center text-gray-400 py-4">No orders found.</div>
        <ul v-else class="space-y-4">
          <li v-for="order in orders" :key="order.id" class="p-4 rounded-md border border-gray-600 bg-gray-800">
            <div>
              <strong class="text-lg">Order #{{ order.id }}</strong> - 
              <span :class="order.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'">{{ order.status }}</span>
            </div>
            <div v-for="item in order.items" :key="item.id" class="ml-4 mt-2 text-gray-300">
              <span class="text-sm font-semibold">{{ item.text || item.name }}</span>
              <span class="text-sm text-gray-400"> - ${{ item.price || '' }}</span>
            </div>
            <button
              v-if="order.status !== 'confirmed'"
              @click="confirmOrder(order.id)"
              class="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Confirm Order
            </button>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentTab = ref('products');
const message = ref('');
const messageType = ref('');

// Product Management state
const products = ref([]);
const name = ref('');
const imageUrl = ref('');
const price = ref(0);
const category = ref('');

// Order Management state
const orders = ref([]);

// Helper function to display messages
const setMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 4000);
};

// --- Product API Functions (Mock for now) ---
async function fetchProducts() {
  try {
    // Mocking API call
    products.value = [
      { id: '1', name: 'Esports Team Jersey', price: 65.00, imageUrl: '', category: 'jersey' },
      { id: '2', name: 'Customizable Hoodie', price: 80.00, imageUrl: '', category: 'hoodie' },
    ];
  } catch (error) {
    setMessage('Failed to load products.', 'error');
  }
}

async function addProduct() {
  if (!name.value || price.value <= 0 || !imageUrl.value || !category.value) {
    setMessage('Please fill out all fields correctly.', 'error');
    return;
  }
  
  try {
    const newId = (products.value.length + 1).toString();
    const newProduct = {
      id: newId,
      name: name.value,
      imageUrl: imageUrl.value,
      price: price.value,
      category: category.value,
    };
    products.value.push(newProduct);
    
    setMessage('Product added successfully!', 'success');
    name.value = '';
    imageUrl.value = '';
    price.value = 0;
    category.value = '';
  } catch (error) {
    setMessage('Failed to add product.', 'error');
  }
}

async function removeProduct(id) {
  try {
    products.value = products.value.filter(p => p.id !== id);
    setMessage('Product removed successfully.', 'success');
  } catch (error) {
    setMessage('Failed to remove product.', 'error');
  }
}

// --- Order API Functions (Mock for now) ---
async function fetchOrders() {
  try {
    // Mocking API call
    orders.value = [
      { id: 'ORD-123', items: [{ id: '1', name: 'Esports Team Jersey', price: 65.00 }], status: 'pending' },
      { id: 'ORD-124', items: [{ id: '1', text: 'Custom Jersey' , price: 70.00, color: '#1F2937'}], status: 'confirmed' },
    ];
  } catch (error) {
    setMessage('Failed to load orders.', 'error');
  }
}

async function confirmOrder(orderId) {
  try {
    const order = orders.value.find(o => o.id === orderId);
    if (order) {
      order.status = 'confirmed';
      setMessage('Order confirmed successfully.', 'success');
    }
  } catch (error) {
    setMessage('Failed to confirm order.', 'error');
  }
}

onMounted(() => {
  fetchProducts();
  fetchOrders();
});
</script>
