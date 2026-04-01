import apiClient from "../config/api";

const DEFAULT_PAGE_SIZE = 12;

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const extractPagination = (raw, fallbackTotal) => {
  if (!raw || typeof raw !== "object") {
    return {
      total: fallbackTotal,
      page: 1,
      limit: DEFAULT_PAGE_SIZE,
    };
  }

  return {
    total: toNumber(
      raw.total ?? raw.totalItems ?? fallbackTotal,
      fallbackTotal,
    ),
    page: toNumber(raw.page ?? raw.currentPage ?? 1, 1),
    limit: toNumber(
      raw.limit ?? raw.pageSize ?? DEFAULT_PAGE_SIZE,
      DEFAULT_PAGE_SIZE,
    ),
  };
};

const normalizeBookListResponse = (responseData) => {
  const directArray = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
      ? responseData.data
      : Array.isArray(responseData?.items)
        ? responseData.items
        : Array.isArray(responseData?.books)
          ? responseData.books
          : [];

  const paginationSource =
    responseData?.pagination ??
    responseData?.meta ??
    responseData?.data?.pagination ??
    responseData?.data?.meta;

  const pagination = extractPagination(paginationSource, directArray.length);

  return {
    items: directArray,
    pagination,
  };
};

/**
 * Get books list.
 * @param {Object} params - { page, limit, keyword, sortBy, sortOrder, categoryId }
 */
export const getBooks = async (params = {}) => {
  const response = await apiClient.get("/book", { params });
  return normalizeBookListResponse(response.data);
};

/**
 * Get book detail by id.
 * @param {string} id
 */
export const getBookById = (id) => {
  return apiClient.get(`/book/id/${id}`);
};

/**
 * Search books.
 * @param {Object} params - { keyword, categoryId, page, limit }
 */
export const searchBooks = (params = {}) => {
  return apiClient.get("/book/search", { params });
};

/**
 * Create new book.
 * @param {Object} data
 */
export const createBook = (data) => {
  return apiClient.post("/book/create", data);
};

/**
 * Update book by id.
 * @param {string} id
 * @param {Object} data
 */
export const updateBook = (id, data) => {
  return apiClient.put(`/book/update/${id}`, data);
};

/**
 * Delete book by id.
 * @param {string} id
 */
export const deleteBook = (id) => {
  return apiClient.delete(`/book/delete/${id}`);
};

/**
 * Get category list.
 */
export const getCategories = () => {
  return apiClient.get("/category");
};

/**
 * Get category detail by id.
 * @param {string} id
 */
export const getCategoryById = (id) => {
  return apiClient.get(`/category/${id}`);
};

/**
 * Create category.
 * @param {Object} data
 */
export const createCategory = (data) => {
  return apiClient.post("/category", data);
};

/**
 * Update category by id.
 * @param {string} id
 * @param {Object} data
 */
export const updateCategory = (id, data) => {
  return apiClient.put(`/category/${id}`, data);
};

/**
 * Delete category by id.
 * @param {string} id
 */
export const deleteCategory = (id) => {
  return apiClient.delete(`/category/${id}`);
};

/**
 * Get search history.
 */
export const getSearchHistory = () => {
  return apiClient.get("/search/history");
};

/**
 * Get search suggestions.
 * @param {Object} params - { keyword }
 */
export const getSearchSuggestions = (params = {}) => {
  return apiClient.get("/search/suggestions", { params });
};

/**
 * Get trending keywords.
 */
export const getSearchTrending = () => {
  return apiClient.get("/search/trending");
};

/**
 * Clear all search history.
 */
export const clearSearchHistory = () => {
  return apiClient.post("/search/clear-history");
};

/**
 * Delete one search history item by id.
 * @param {string} id
 */
export const deleteSearchHistoryItem = (id) => {
  return apiClient.delete(`/search/history/${id}`);
};
