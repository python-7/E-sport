export default defineEventHandler(() => {
  globalThis.orders = globalThis.orders || []
  return globalThis.orders
})