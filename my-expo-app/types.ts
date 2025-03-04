export interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
}
