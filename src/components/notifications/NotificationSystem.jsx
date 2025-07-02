import React, { useState, useEffect, useContext } from 'react';
import { Bell, X, Package, Tag, Info, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import PropTypes from 'prop-types';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { mode } = useContext(myContext);

  // Helper function to safely get user ID
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.user?.uid || user.uid) : null;
  };

  useEffect(() => {
    loadNotifications();
    // Simulate real-time notifications
    const interval = setInterval(() => {
      checkForNewNotifications();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    const userId = getUserId();
    if (userId) {
      const savedNotifications = localStorage.getItem(`notifications_${userId}`);
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        setNotifications(parsedNotifications);
        setUnreadCount(parsedNotifications.filter(n => !n.read).length);
      }
    }
  };

  const checkForNewNotifications = () => {
    // Simulate new notifications (in real app, this would check server)
    const userId = getUserId();
    if (userId && Math.random() < 0.1) { // 10% chance of new notification
      addNotification({
        type: 'promotion',
        title: 'Special Offer!',
        message: 'Get 20% off on selected items',
        timestamp: new Date().toISOString()
      });
    }
  };

  const addNotification = (notification) => {
    const userId = getUserId();
    if (userId) {
      const newNotification = {
        id: Date.now(),
        ...notification,
        read: false
      };
      
      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      setUnreadCount(prev => prev + 1);
      
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(updatedNotifications));
      
      // Show toast notification
      toast.info(notification.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(updatedNotifications));
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(updatedNotifications));
    }
  };

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(updatedNotifications));
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <Package size={20} className="text-blue-500" />;
      case 'promotion':
        return <Tag size={20} className="text-green-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-black hover:text-white bg-white hover:bg-black rounded-full shadow-lg transition-all border border-black"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-black z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-black tracking-tight">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-black hover:text-white bg-white hover:bg-black border border-black rounded px-2 py-1 transition-all"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-black hover:text-white bg-white hover:bg-black border border-black rounded-full p-1 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-black/10">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 group flex items-start gap-3 transition-all rounded-xl relative ${
                      !notification.read ? 'border-l-4 border-black bg-black/5' : 'border-l-4 border-transparent'
                    } hover:bg-black/10`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-extrabold ${!notification.read ? 'text-black' : 'text-gray-700'}`}>{notification.title}</span>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-black hover:text-white bg-white hover:bg-black border border-black rounded-full p-1 ml-2 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-black/80 mt-1 font-medium">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setNotifications([]);
                  setUnreadCount(0);
                  const userId = getUserId();
                  if (userId) {
                    localStorage.removeItem(`notifications_${userId}`);
                  }
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

NotificationSystem.propTypes = {
  // Add any props if needed
};

export default NotificationSystem; 