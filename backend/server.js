import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { setupChatSocket } from "./sockets/chatSocket.js";
import { setupNotificationSocket } from "./sockets/notificationSocket.js";
import { setupRequestSocket } from "./sockets/requestSocket.js";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Setup different namespaces
const chatIO = io.of("/chat");
const notificationIO = io.of("/notification");
const requestIO = io.of("/request");

// Initialize socket handlers
setupChatSocket(chatIO);
setupNotificationSocket(notificationIO);
setupRequestSocket(requestIO);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
