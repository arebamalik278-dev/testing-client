const API_BASE_URL = 'https://backendtestin.vercel.app/api';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  return await fetchData('/products');
};

export const getProductById = async (id) => {
  return await fetchData(`/products/${id}`);
};

export const getProductsByCategory = async (category) => {
  return await fetchData(`/products/category/${category}`);
};

export const getCategories = async () => {
  return await fetchData('/products/categories');
};

export const getLimitedProducts = async (limit = 10) => {
  return await fetchData(`/products?limit=${limit}`);
};

export const getSortedProducts = async (sort = 'asc') => {
  return await fetchData(`/products?sort=${sort}`);
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