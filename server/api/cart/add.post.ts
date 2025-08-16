// server/api/cart/add.post.ts
import { ref } from 'vue'

const cart = ref([])

export function useCart() {
  async function addToCart(product, user) {
    // Send product and user info to the API
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        jersey: product // assuming jersey is the product object
      })
    })
    const data = await res.json()
    cart.value.push(data.cartItem)
  }
  return { cart, addToCart }
}