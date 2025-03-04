import { createServer } from "http";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";
import { setupSocket } from "../socket.js";

describe("Socket.IO Server", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    setupSocket(io);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should connect and disconnect", (done) => {
    clientSocket.on("disconnect", () => {
      done();
    });
    clientSocket.disconnect();
  });

  test("should receive message event", (done) => {
    const testMessage = { text: "Hello World", user: "Test User" };

    clientSocket.on("message", (data) => {
      expect(data).toEqual(testMessage);
      done();
    });

    serverSocket.emit("message", testMessage);
  });

  test("should broadcast message to all clients", (done) => {
    const testMessage = { text: "Broadcast test", user: "Test User" };

    clientSocket.on("message", (data) => {
      expect(data).toEqual(testMessage);
      done();
    });

    clientSocket.emit("message", testMessage);
  });
});
