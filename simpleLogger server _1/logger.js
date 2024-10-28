const fs = require("fs");

function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;

  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Ошибка при записи в файл:", err);
    } else {
      console.log("Сообщение записано в лог:", message);
    }
  });
}

module.exports = logMessage;
