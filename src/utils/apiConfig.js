export const apiConfig = {
  postLogin: `auth/login`,
  getProducts: `products`,
  addToCart: (userId) => `api/cart/${userId}`, 
  viewCart: (userId) => `api/cart/${userId}`, 
  deleteCartItem: (id) => `api/cart/${id}`, 
  clearCart: (userId) => `api/cart/clear/${userId}`, 
};


