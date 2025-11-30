const WebSocket = require("ws");
const server = new WebSocket.Server({ port: process.env.PORT || 10000 });

console.log("WebSocket Server is running...");

server.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast message to all clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
