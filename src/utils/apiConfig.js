export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,
  editprofile: (id) => `users/${id}`,  // Use userId for the PUT request to update profile
  getProfile: (userId) => `users/${userId}`,  // Use userId for the GET request to fetch profile
  addToCart: (userId) => `cart/${userId}`,

  // Retrieves cart items for a specific user (GET request)
  viewCart: (userId) => `cart/${userId}`,
  deleteCartItem: (itemId) => `cart/${itemId}`,
  clearCart: `cart/clear`,
  fetchProduct: (query) => `/products/search?query=${encodeURIComponent(query)}`
};
