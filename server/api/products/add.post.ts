import { readBody } from 'h3'
let products = globalThis.products || []

export default defineEventHandler(async (event) => {
  const { name, imageUrl, price, category } = await readBody(event)
  const newProduct = {
    id: `jersey-${Date.now()}`,
    name,
    imageUrl,
    price,
    category
  }
  products.push(newProduct)
  globalThis.products = products
  return { success: true, product: newProduct }
})