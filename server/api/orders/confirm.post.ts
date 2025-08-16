import { readBody } from 'h3'
export default defineEventHandler(async (event) => {
  const { orderId } = await readBody(event)
  globalThis.orders = globalThis.orders || []
  const order = globalThis.orders.find((o: any) => o.id === orderId)
  if (order) order.status = 'confirmed'
  return { success: true }
})