const fs = require("fs");

fs.writeFile("info.txt", "Node.js is awesome!", (err) => {
  if (err) {
    return console.error(`Ошибка при записи в файл: ${err.message}`);
  }
  console.log("Текст успешно записан в файл info.txt.");

  fs.readFile("info.txt", "utf8", (err, data) => {
    if (err) {
      return console.error(`Ошибка при чтении файла: ${err.message}`);
    }
    console.log("Содержимое файла info.txt:");
    console.log(data);
  });
});
