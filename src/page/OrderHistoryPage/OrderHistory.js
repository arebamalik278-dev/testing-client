import { Package, Truck, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext/UserContext';
import backendApi from '../../services/api/backendApi';
import { getUserOrders as getMockOrders } from '../../services/api/api';
import './OrderHistory.css';

const OrderHistory = () => {
  const { user, isAuthenticated } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Try to fetch from real backend first
        try {
          const backendOrders = await backendApi.getUserOrders();
          setOrders(backendOrders.data || []);
        } catch (backendErr) {
          console.warn('Backend not available, using mock orders');
          // Fallback to mock orders
          const data = await getMockOrders(user?.id);
          setOrders(data);
        }
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  const getStatusConfig = (status) => {
    // Normalize status to lowercase for matching
    const normalizedStatus = status ? status.toLowerCase() : 'pending';
    
    const configs = {
      delivered: {
        icon: CheckCircle,
        label: 'Delivered',
        color: '#10b981',
        bgColor: '#d1fae5'
      },
      shipped: {
        icon: Truck,
        label: 'Shipped',
        color: '#3b82f6',
        bgColor: '#dbeafe'
      },
      processing: {
        icon: Package,
        label: 'Processing',
        color: '#f59e0b',
        bgColor: '#fef3c7'
      },
      pending: {
        icon: Package,
        label: 'Pending',
        color: '#6b7280',
        bgColor: '#f3f4f6'
      },
      cancelled: {
        icon: XCircle,
        label: 'Cancelled',
        color: '#ef4444',
        bgColor: '#fee2e2'
      },
      refunded: {
        icon: XCircle,
        label: 'Refunded',
        color: '#8b5cf6',
        bgColor: '#ede9fe'
      }
    };
    
    return configs[normalizedStatus] || configs.pending;
  };

  if (!isAuthenticated) {
    return (
      <div className="order-history-page">
        <h1 className="order-history-title">My Orders</h1>
        <div className="login-required">
          <p>Please sign in to view your order history</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="order-history-page">
        <h1 className="order-history-title">My Orders</h1>
        <div className="orders-loading">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-page">
        <h1 className="order-history-title">My Orders</h1>
        <div className="orders-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-page">
        <h1 className="order-history-title">My Orders</h1>
        <p className="order-history-subtitle">Track and manage your orders</p>
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <h1 className="order-history-title">My Orders</h1>
      <p className="order-history-subtitle">Track and manage your orders</p>

      <div className="orders-list">
        {orders.map(order => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-header-left">
                  <div className="order-id-section">
                    <span className="order-tracking-label">Tracking Number:</span>
                    <span className="order-tracking-number">{order.orderNumber || order.id}</span>
                    <span className="order-date">{order.date || new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div 
                    className="order-status-badge"
                    style={{ 
                      color: statusConfig.color,
                      backgroundColor: statusConfig.bgColor
                    }}
                  >
                    <StatusIcon className="status-icon" />
                    {statusConfig.label}
                  </div>
                </div>
                <div className="order-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">Rs {Number(order.total || order.totalAmount || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <img src={item.image} alt={item.title} className="order-item-img" />
                    <div className="order-item-info">
                      <p className="order-item-title">{item.title}</p>
                      <p className="order-item-qty">Quantity: {item.quantity}</p>
                    </div>
                    <p className="order-item-price">Rs {Number(item.price || 0).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="order-action-btn view-btn">
                  <Eye className="action-btn-icon" />
                  View Details
                </button>
                {order.status.toLowerCase() === 'delivered' && (
                  <button className="order-action-btn reorder-btn">
                    Reorder
                  </button>
                )}
                {order.status.toLowerCase() === 'shipped' && (
                  <button className="order-action-btn track-btn">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;

