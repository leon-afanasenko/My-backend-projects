const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Обработка отправленных сообщений
  socket.on("chat message", (msg) => {
    console.log("Message received: " + msg);

    // Формируем сообщение с отметкой времени
    const message = {
      text: msg,
      time: new Date().toLocaleTimeString(),
    };

    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
