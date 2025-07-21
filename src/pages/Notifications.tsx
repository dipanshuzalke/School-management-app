import React from 'react';
import { Bell, Send, CheckCircle, AlertCircle, Calendar, BookOpen } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Notification, Student } from '../data/mockData';

interface NotificationsProps {
  notifications: Notification[];
  student: Student;
  onSendNotification: () => void;
  onMarkAsRead: (id: string) => void;
}

export function Notifications({ notifications, student, onSendNotification, onMarkAsRead }: NotificationsProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return BookOpen;
      case 'event': return Calendar;
      case 'grade': return CheckCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'event': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'grade': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with your academic activities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {unreadCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unread</p>
          </div>
          <button
            onClick={onSendNotification}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={18} className="mr-2" />
            Send Test Notification
          </button>
        </div>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            
            return (
              <Card 
                key={notification.id} 
                className={`p-6 cursor-pointer transition-all duration-200 ${
                  !notification.isRead 
                    ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10' 
                    : ''
                }`}
                onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        !notification.isRead 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`mb-3 ${
                      !notification.isRead 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(notification.date)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${colorClass}`}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <Bell size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You'll receive notifications about assignments, grades, and school events here.
          </p>
          <button
            onClick={onSendNotification}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={18} className="mr-2" />
            Send Test Notification
          </button>
        </Card>
      )}
    </div>
  );
}