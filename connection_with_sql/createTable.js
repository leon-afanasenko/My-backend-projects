import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
    return;
  }
  console.log("Подключение к базе данных product_db установлено.");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    );
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Ошибка создания таблицы:", err.message);
    } else {
      console.log("Таблица products успешно создана.");
    }
    db.end();
  });
});
