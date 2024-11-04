const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const filename = process.env.FILENAME;

fs.writeFile(filename, "фарту масти.", (err) => {
  if (err) {
    console.error("Ошибка при создании файла:", err);
    return;
  }

  console.log(`${filename} был успешно создан.`);

  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return;
    }

    console.log("Содержимое файла:", data);
  });
});
