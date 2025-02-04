export const apiConfig = {
  postLogin: `auth/login`,
  postRegister:`auth/register`,
  getProducts: `products`,
  editprofile: (id) => `users/${id}`,  // Use userId for the PUT request to update profile
  getProfile: (userId) => `users/${userId}`,  // Use userId for the GET request to fetch profile
  addToCart: (userId) => `cart/${userId}`,
  viewCart: (userId) => `cart/${userId}`,
  deleteCartItem: (userId, itemId) => `cart/${userId}/${itemId}`,
  clearCart: `cart/clear`,
};
