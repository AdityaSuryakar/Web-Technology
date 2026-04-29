const WebSocket = require("ws");

// Create server
const wss = new WebSocket.Server({ port: 3000 });

console.log("WebSocket server running at ws://localhost:3000");

// On client connection
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send welcome message
  ws.send("Welcome to WebSocket Server!");

  // Receive message
  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // On disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});