export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,
  addToCart: (userId) => `cart/${userId}`,
  viewCart: (userId) => `cart/${userId}`,
  deleteCartItem: (userId, itemId) => `cart/${userId}/${itemId}`,
  clearCart: `cart/clear`,

};

