import { ref, watch } from 'vue'

const cartItems = ref([])

// Persist cart in localStorage
const savedCart = localStorage.getItem('cartItems')
if (savedCart) {
  cartItems.value = JSON.parse(savedCart)
}
watch(cartItems, (newCart) => {
  localStorage.setItem('cartItems', JSON.stringify(newCart))
}, { deep: true })

export function useCart() {
  function addToCart(item) {
    cartItems.value.push(item)
  }
  function removeFromCart(id) {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }
  return { cartItems, addToCart, removeFromCart }
}