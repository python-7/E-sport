type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
};

// Only initialize as empty if not already set
if (!globalThis.products) {
  globalThis.products = [];
}

export default defineEventHandler((): Product[] => {
  return globalThis.products;
});