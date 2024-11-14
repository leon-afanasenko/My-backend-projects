const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = process.env.DB_PATH || "./database.sqlite";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
  } else {
    console.log("Подключение к SQLite базе данных успешно установлено.");
  }
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      mustChangePassword BOOLEAN DEFAULT 0,
      role TEXT DEFAULT 'user'
    )
  `,
    (err) => {
      if (err) {
        console.error("Ошибка при создании таблицы:", err.message);
      } else {
        console.log("Таблица пользователей успешно создана.");
      }
    }
  );
});

module.exports = db;
