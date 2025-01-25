export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,

  // Adds a cart item for a user (POST request requires userId and a CartItem object)
  addToCart: (userId) => `cart/${userId}`,

  // Retrieves cart items for a specific user (GET request)
  viewCart: (userId) => `cart/${userId}`,

  // Removes a specific cart item by item ID (DELETE request)
  deleteCartItem: (itemId) => `cart/${itemId}`,

  // Clears all cart items for a specific user (DELETE request)
  clearCart: (userId) => `cart/clear/${userId}`,
};
