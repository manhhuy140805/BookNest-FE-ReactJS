import apiClient from "../config/api";

/**
 * Get list of favorite books
 */
export const getFavorites = () => {
  return apiClient.get("/user/favoriteBoks");
};

/**
 * Add book to favorites
 * @param {number} bookId - Book ID
 */
export const addFavorite = (bookId) => {
  return apiClient.post(`/user/favorite/add/${bookId}`);
};

/**
 * Remove book from favorites
 * @param {number} bookId - Book ID
 */
export const removeFavorite = (bookId) => {
  return apiClient.delete(`/user/favorite/remove/${bookId}`);
};
