// server/api/products/[category].get.ts
export default defineEventHandler((event) => {
  // Extract the category from the URL parameters
  const category = getRouterParam(event, 'category');

  // This is a mock database of products. In a real app, you would
  // query a real database here.
  const allProducts = {
    football: [
      { id: 'football-1', name: 'Premium Football', price: 29.99, imageUrl: 'https://placehold.co/400x300/e5e7eb/333?text=Football' },
      { id: 'football-2', name: 'Deluxe Football Jersey', price: 59.99, imageUrl: 'https://placehold.co/400x300/4f46e5/fff?text=Football+Jersey' },
    ],
    netball: [
      { id: 'netball-1', name: 'Official Netball', price: 19.99, imageUrl: 'https://placehold.co/400x300/e5e7eb/333?text=Netball' },
      { id: 'netball-2', name: 'Training Netball Shoes', price: 79.99, imageUrl: 'https://placehold.co/400x300/be123c/fff?text=Netball+Shoes' },
    ],
    basketball: [
      { id: 'basketball-1', name: 'Team Basketball', price: 34.99, imageUrl: 'https://placehold.co/400x300/fde047/333?text=Basketball' },
      { id: 'basketball-2', name: 'Basketball Shorts', price: 44.99, imageUrl: 'https://placehold.co/400x300/000000/fff?text=Basketball+Shorts' },
    ],
  };

  // Return the products for the requested category or an empty array if not found
  return allProducts[category] || [];
});