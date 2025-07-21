import { useCallback } from 'react';
import { mockStudent } from '../data/mockData';

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  const sendNotification = useCallback(async (title: string, message: string) => {
    const hasPermission = await requestPermission();
    
    if (hasPermission) {
      new Notification(title, {
        body: message,
        icon: mockStudent.photo,
        badge: '/favicon.ico',
        tag: 'school-app-notification',
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View',
            icon: '/favicon.ico'
          }
        ]
      });
    } else {
      alert(`${title}\n\n${message}`);
    }
  }, [requestPermission]);

  return { sendNotification, requestPermission };
}