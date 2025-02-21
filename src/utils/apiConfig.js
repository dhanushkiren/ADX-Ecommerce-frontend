export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,
  editprofile: (id) => `users/${id}`,  // Update profile
  getProfile: (userId) => `users/${userId}`,  // Fetch profile
  addToCart: (userId) => `cart/${userId}`,  // Add to cart
  viewCart: (userId) => `cart/${userId}`,  // View cart items
  deleteCartItem: (userId, itemId) => `cart/${userId}/${itemId}`,  // Delete item from cart
  clearCart: `cart/clear`,  // Clear cart
  fetchProduct: (query) => `/api/products/search?query=${encodeURIComponent(query)}`,  // Product search
  
  // ✅ Order API Endpoints
  placeOrder: `/api/orders`,  // Create order (POST)
  getOrderById: (orderId) => `/api/orders/${orderId}`,  // Get order by ID (GET)
  getOrdersByUserId: (userId) => `/api/orders/user/${userId}`,  // Get all orders of a user (GET)
};
