const fs = require("fs");
const path = require("path");

const originalFilePath = path.join(__dirname, "example.jpg");
const renamedFilePath = path.join(__dirname, "renamedExample.jpg");
const copyFilePath = path.join(__dirname, "copyOfExample.jpg");

fs.rename(originalFilePath, renamedFilePath, (err) => {
  if (err) {
    console.error("Ошибка при переименовании файла:", err);
    return;
  }
  console.log("Файл успешно переименован и перемещен.");

  fs.copyFile(renamedFilePath, copyFilePath, (err) => {
    if (err) {
      console.error("Ошибка при копировании файла:", err);
      return;
    }
    console.log("Файл успешно скопирован.");

    fs.unlink(renamedFilePath, (err) => {
      if (err) {
        console.error("Ошибка при удалении файла:", err);
        return;
      }
      console.log("Файл успешно удален.");
    });
  });
});
