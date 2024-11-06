/*
// server.js
import http from "http";

const server = http.createServer((req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end("Unauthorized");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Authorization header received");
  }
});

// Настройка сервера на прослушивание порта 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});*/

/*
// server.js
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  try {
    // Искусственно вызываем ошибку для тестирования
    throw new Error("Test error");
  } catch (error) {
    // Логируем ошибку в файл
    fs.appendFile(
      "errors.log",
      `${new Date().toISOString()} - ${error.message}\n`,
      (err) => {
        if (err) console.error("Could not write to file", err);
      }
    );

    // Отправляем ответ с ошибкой
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

// Настройка сервера на прослушивание порта 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});*/

/* server.js
import http from "http";

const server = http.createServer((req, res) => {
  if (req.method === "PUT") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("PUT-запрос обработан");
  } else if (req.method === "DELETE") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("DELETE-запрос обработан");
  } else if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("GET-запрос обработан"); 
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Метод не поддерживается");
  }
});


server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});*/
