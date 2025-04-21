export const apiConfig = {
  postLogin: `auth/login`,
  postRegister:`auth/register`,
  getProducts: `products`,
  editprofile: (id) => `users/${id}`,  // Use userId for the PUT request to update profile
  getProfile: (userId) => `users/${userId}`,  // Use userId for the GET request to fetch profile
  addToCart: (userId) => `cart/${userId}`,
  // Retrieves cart items for a specific user (GET request)
  viewCart: (userId) => `cart/${userId}`,
  deleteCartItem: (itemId) => `cart/${itemId}`,
  clearCart: `cart/clear`,
  fetchProduct: (query) => `products/search?query=${query}`,
  // ✅ Order API Endpoints
  placeOrder: `orders`,  // Create order (POST)
  getOrderById: (orderId) => `orders/${orderId}`,  // Get order by ID (GET)
  getOrdersByUserId: (userId) => `orders/user/${userId}`,  // Get all orders of a user (GET)
  updateCart : (userId,itemId) => `cart/${userId}/update/${itemId}`,
  fetchOrders : (userId) => `orders/user/${userId}`, // Fetch all orders for a user
};
