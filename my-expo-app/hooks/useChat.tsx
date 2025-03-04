import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { Message } from '../types';

export const useChat = (room: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatSocket } = useSocket();

  useEffect(() => {
    if (!chatSocket) return;

    chatSocket.emit('join_room', room);

    chatSocket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      chatSocket.off('receive_message');
    };
  }, [chatSocket, room]);

  const sendMessage = (message: string, sender: string): void => {
    if (chatSocket) {
      chatSocket.emit('send_message', { room, message, sender });
    }
  };

  return { messages, sendMessage };
};
