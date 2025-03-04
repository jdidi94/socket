import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { Notification } from '../types';

export const useNotification = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { notificationSocket } = useSocket();

  useEffect(() => {
    if (!notificationSocket) return;

    notificationSocket.emit('subscribe_notifications', userId);

    notificationSocket.on('new_notification', (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      notificationSocket.off('new_notification');
    };
  }, [notificationSocket, userId]);

  return { notifications };
};
