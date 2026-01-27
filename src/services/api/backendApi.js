// Backend API Service - Connects to real backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
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
  const data = await handleResponse(response);
  return data.data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return data.data;
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
  // Transform client order format to server expected format
  const transformedOrder = {
    items: orderData.orderItems.map(item => ({
      product: item.productId || item.id,
      quantity: item.qty || item.quantity,
      name: item.name,
      price: item.price,
      image: item.image
    })),
    shippingAddress: {
      street: orderData.shippingAddress.address,
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      zipCode: orderData.shippingAddress.postalCode || orderData.shippingAddress.zipCode,
      country: orderData.shippingAddress.country,
      phone: orderData.shippingAddress.phone || orderData.phone
    },
    paymentInfo: {
      method: transformPaymentMethod(orderData.paymentMethod)
    },
    notes: orderData.notes || ''
  };
  
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(transformedOrder),
  });
  return handleResponse(response);
};

// Helper function to transform payment method from client format to server format
const transformPaymentMethod = (method) => {
  const methodMap = {
    'cod': 'Cash on Delivery',
    'card': 'Credit Card',
    'jazzcash': 'Cash on Delivery',
    'easypaisa': 'Cash on Delivery',
    'bank_transfer': 'Bank Transfer',
    'khatain': 'Cash on Delivery',
    'nayapay': 'Cash on Delivery',
    'sadapay': 'Cash on Delivery',
    'paypro': 'Credit Card',
    'mobilepos': 'Credit Card',
    'safepay': 'Credit Card'
  };
  return methodMap[method] || 'Cash on Delivery';
};

export const getUserOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
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

// Banner APIs
export const getActiveBanners = async () => {
  const response = await fetch(`${API_BASE_URL}/banners/active`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

// Payment APIs
export const post = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
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
  checkApiHealth,
  getActiveBanners,
  post
};

export default backendApi;

