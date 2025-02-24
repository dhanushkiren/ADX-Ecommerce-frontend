export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,
  editprofile: (id) => `users/${id}`,  // Use userId for the PUT request to update profile
  getProfile: (userId) => `users/${userId}`,  // Use userId for the GET request to fetch profile
  addToCart: (userId) => `cart/${userId}`,  // Add to cart
  // Retrieves cart items for a specific user (GET request)
  viewCart: (userId) => `cart/${userId}`,
  deleteCartItem: (itemId) => `cart/${itemId}`,
  clearCart: `cart/clear`,
  fetchProduct: (query) => `products/search?query=${query}`,
  // ✅ Order API Endpoints
  placeOrder: `orders`,  // Create order (POST)
  getOrderById: (orderId) => `orders/${orderId}`,  // Get order by ID (GET)
  getOrdersByUserId: (userId) => `orders/user/${userId}`,  // Get all orders of a user (GET)
};
