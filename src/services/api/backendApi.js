// Backend API Service - Connects to real backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backendtestin.vercel.app/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('shophub_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Network response was not ok');
  }
  return data;
};

// Auth APIs
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const getUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  });
  return handleResponse(response);
};

// Product APIs
export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  });
  return handleResponse(response);
};

// Order APIs
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
};

export const getUserOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders/myorders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  });
  return handleResponse(response);
};

export const getOrderById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  });
  return handleResponse(response);
};

export const getAllOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  });
  return handleResponse(response);
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(statusData),
  });
  return handleResponse(response);
};

// Health check
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return await response.json();
  } catch (error) {
    console.error('API Health check failed:', error);
    return { status: 'DOWN' };
  }
};

const backendApi = {
  loginUser,
  registerUser,
  getUserProfile,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  checkApiHealth
};

export default backendApi;

