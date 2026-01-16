const API_BASE_URL = 'https://backendtestin.vercel.app/api';

// Default products for client when no backend/localStorage data
const defaultProducts = [
  { _id: '1', id: '1', name: 'iPhone 15 Pro', sku: 'IPP-001', category: 'Electronics', price: 279999, countInStock: 234, image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=iPhone', description: 'Latest iPhone with A17 Pro chip', rating: { rate: 4.8, count: 156 } },
  { _id: '2', id: '2', name: 'MacBook Air M3', sku: 'MBA-002', category: 'Electronics', price: 309999, countInStock: 156, image: 'https://via.placeholder.com/60x60/10b981/ffffff?text=MacBook', description: 'Superfast MacBook with M3 chip', rating: { rate: 4.9, count: 203 } },
  { _id: '3', id: '3', name: 'AirPods Pro 2', sku: 'APP-003', category: 'Audio', price: 69999, countInStock: 432, image: 'https://via.placeholder.com/60x60/8b5cf6/ffffff?text=AirPods', description: 'Wireless earbuds with ANC', rating: { rate: 4.7, count: 312 } },
  { _id: '4', id: '4', name: 'Apple Watch Ultra', sku: 'AWU-004', category: 'Wearables', price: 224999, countInStock: 89, image: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=Watch', description: 'Advanced sports watch', rating: { rate: 4.5, count: 78 } },
  { _id: '5', id: '5', name: 'iPad Pro 12.9"', sku: 'IPP-005', category: 'Tablets', price: 309999, countInStock: 123, image: 'https://via.placeholder.com/60x60/ef4444/ffffff?text=iPad', description: 'Pro tablet with M2 chip', rating: { rate: 4.6, count: 89 } },
  { _id: '6', id: '6', name: 'Samsung Galaxy S24', sku: 'SGS-006', category: 'Electronics', price: 239999, countInStock: 267, image: 'https://via.placeholder.com/60x60/06b6d4/ffffff?text=Galaxy', description: 'Latest Galaxy with AI features', rating: { rate: 4.2, count: 98 } },
  { _id: '7', id: '7', name: 'Sony WH-1000XM5', sku: 'SWH-007', category: 'Audio', price: 98999, countInStock: 178, image: 'https://via.placeholder.com/60x60/6366f1/ffffff?text=Sony', description: 'Premium noise cancelling headphones', rating: { rate: 4.4, count: 145 } },
  { _id: '8', id: '8', name: 'Nintendo Switch OLED', sku: 'NSO-008', category: 'Gaming', price: 98999, countInStock: 45, image: 'https://via.placeholder.com/60x60/ec4899/ffffff?text=Switch', description: 'Gaming console with OLED screen', rating: { rate: 4.3, count: 67 } }
];

const fetchData = async (endpoint) => {
  try {
    // Try backend first
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (response.ok) {
      const data = await response.json();
      // Save to localStorage for sync
      if (endpoint === '/products') {
        localStorage.setItem('clientProducts', JSON.stringify(data));
      }
      return data;
    }
    throw new Error('Backend not available');
  } catch (error) {
    console.warn('API Error, falling back to localStorage:', error.message);
    
    // Fallback to localStorage
    if (endpoint === '/products') {
      const stored = localStorage.getItem('clientProducts');
      if (stored) {
        return JSON.parse(stored);
      }
      // If no stored data, check admin products
      const adminProducts = localStorage.getItem('adminProducts');
      if (adminProducts) {
        const adminData = JSON.parse(adminProducts);
        // Transform to client format
        const clientData = adminData.map(p => ({
          ...p,
          _id: p.id,
          countInStock: p.stock,
          description: `${p.name} - ${p.category}`,
          rating: { rate: 4.5, count: 100 }
        }));
        localStorage.setItem('clientProducts', JSON.stringify(clientData));
        return clientData;
      }
      // Return default products
      localStorage.setItem('clientProducts', JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    throw error;
  }
};

export const getAllProducts = async () => {
  return await fetchData('/products');
};

export const getProductById = async (id) => {
  // Try localStorage first
  const stored = localStorage.getItem('clientProducts');
  if (stored) {
    const products = JSON.parse(stored);
    const product = products.find(p => p._id === id || p.id === id);
    if (product) return product;
  }
  
  // Try backend
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Backend not available');
  }
  
  // Try default products
  return defaultProducts.find(p => p._id === id || p.id === id);
};

export const getProductsByCategory = async (category) => {
  const products = await fetchData('/products');
  return products.filter(p => p.category === category);
};

export const getCategories = async () => {
  const products = await fetchData('/products');
  const categories = [...new Set(products.map(p => p.category))];
  return categories;
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

// Initialize client products from admin products on first load
export const initializeClientProducts = () => {
  const stored = localStorage.getItem('clientProducts');
  if (!stored) {
    const adminProducts = localStorage.getItem('adminProducts');
    if (adminProducts) {
      const adminData = JSON.parse(adminProducts);
      const clientData = adminData.map(p => ({
        ...p,
        _id: p.id,
        countInStock: p.stock,
        description: `${p.name} - ${p.category}`,
        rating: { rate: 4.5, count: 100 }
      }));
      localStorage.setItem('clientProducts', JSON.stringify(clientData));
    } else {
      localStorage.setItem('clientProducts', JSON.stringify(defaultProducts));
    }
  }
};

// Call initialization
initializeClientProducts();

