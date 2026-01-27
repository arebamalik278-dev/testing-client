import { createContext, useContext, useState, useEffect } from 'react';
import backendApi from '../../services/api/backendApi';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shophub_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('shophub_token');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shophub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shophub_user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const response = await backendApi.loginUser(credentials);
      
      // Handle different response formats from backend
      const userResponse = response.data || response;
      const token = response.token || response.data?.token;
      
      if (userResponse._id && token) {
        const userData = {
          ...userResponse,
          name: userResponse.name || credentials.email.split('@')[0],
          token: token
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('shophub_token', token);
        
        return userData;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('shophub_user');
    localStorage.removeItem('shophub_token');
  };

  const updateUser = (updates) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updates
    }));
  };

  const register = async (userData) => {
    try {
      console.log('Registering user:', userData);
      const response = await backendApi.registerUser(userData);
      console.log('Registration response:', response);
      
      // Handle different response formats from backend
      const userResponse = response.data || response;
      const token = response.token || response.data?.token;
      console.log('User response:', userResponse);
      console.log('Token:', token);
      
      if (userResponse._id && token) {
        const newUser = {
          ...userResponse,
          name: userResponse.name || userData.name,
          token: token
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('shophub_token', token);
        
        return newUser;
      } else {
        throw new Error('Registration failed: Invalid response format');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
