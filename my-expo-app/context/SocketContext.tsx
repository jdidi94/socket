import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
  chatSocket: Socket | null;
  notificationSocket: Socket | null;
  requestSocket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [notificationSocket, setNotificationSocket] = useState<Socket | null>(null);
  const [requestSocket, setRequestSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const chatIO = io('http://192.168.11.5:5000/chat');
    const notificationIO = io('http://192.168.11.5:5000/notification');
    const requestIO = io('http://192.168.11.5:5000/request');

    setChatSocket(chatIO);
    setNotificationSocket(notificationIO);
    setRequestSocket(requestIO);

    return () => {
      chatIO.disconnect();
      notificationIO.disconnect();
      requestIO.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ chatSocket, notificationSocket, requestSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
