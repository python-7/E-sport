import { readBody } from 'h3'
let products = globalThis.products || []

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  products = products.filter(p => p.id !== id)
  globalThis.products = products
  return { success: true }
})