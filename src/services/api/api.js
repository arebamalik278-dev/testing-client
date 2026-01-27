const API_BASE_URL = 'http://localhost:5000/api';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Backend API failed');
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const getAllProducts = async () => {
  return await fetchData('/products');
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Product not found');
  } catch (error) {
    console.error('Error fetching product:', error.message);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  const products = await fetchData('/products');
  return products.filter(p => p.category === category);
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (response.ok) {
      const data = await response.json();
      return data.data; // Backend returns { success: true, count: x, data: [categories] }
    }
    throw new Error('Failed to fetch categories');
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
};

export const getLimitedProducts = async (limit = 10) => {
  const products = await fetchData('/products');
  return products.slice(0, limit);
};

export const getSortedProducts = async (sort = 'asc') => {
  const products = await fetchData('/products');
  return products.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);
};

export const loginUser = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: credentials.email,
        name: 'John Doe',
        token: 'fake_jwt_token_' + Date.now()
      });
    }, 1000);
  });
};

export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        token: 'fake_jwt_token_' + Date.now()
      });
    }, 1000);
  });
};

export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '#ORD-' + Date.now(),
        ...orderData,
        paymentMethod: orderData.paymentMethod || 'card',
        status: 'processing',
        isPaid: orderData.paymentMethod === 'cod' ? false : true,
        createdAt: new Date().toISOString()
      });
    }, 1000);
  });
};

// Payment Methods Available in Pakistan
export const PAYMENT_METHODS = [
  { id: 'safepay', name: 'SafePay', icon: '🛡️', popular: true, description: 'Secure Online Payment with SSL Encryption' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳', popular: true, description: 'Visa, Mastercard, UnionPay' },
  { id: 'jazzcash', name: 'JazzCash', icon: '📱', popular: true, description: 'Mobile Wallet - *786#' },
  { id: 'easypaisa', name: 'EasyPaisa', icon: '📱', popular: true, description: 'Mobile Wallet - *786#' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', popular: true, description: 'Pay when you receive' },
  { id: 'bank_transfer', name: 'Bank Transfer (IBFT)', icon: '🏦', popular: false, description: 'Interbank Fund Transfer' },
  { id: 'khatain', name: 'Khatain (BNPL)', icon: '🛒', popular: false, description: 'Buy Now, Pay Later' },
  { id: 'nayapay', name: 'NayaPay', icon: '📱', popular: false, description: 'Digital Wallet' },
  { id: 'sadapay', name: 'Sadapay', icon: '📱', popular: false, description: 'Digital Wallet' },
  { id: 'paypro', name: 'PayPro', icon: '💳', popular: false, description: 'Payment Gateway' },
  { id: 'mobilepos', name: 'Mobile POS', icon: '📟', popular: false, description: 'Card on Delivery' },
];

export const getUserOrders = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '#ORD-2024-001',
          date: 'Jan 5, 2026',
          status: 'delivered',
          total: 204.38,
          items: [
            {
              id: 1,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
              title: 'Product Name',
              quantity: 2,
              price: 89.99
            }
          ]
        }
      ]);
    }, 1000);
  });
};



