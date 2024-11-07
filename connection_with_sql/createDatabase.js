import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err.message);
    return;
  }
  console.log("Подключение к MySQL установлено.");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS product_db",
    (err, results) => {
      if (err) {
        console.error("Ошибка создания базы данных:", err.message);
      } else {
        console.log("База данных product_db успешно создана.");
      }
      connection.end();
    }
  );
});
