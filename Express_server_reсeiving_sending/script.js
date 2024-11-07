const userDataForm = document.getElementById("userDataForm");
const API_URL = "http://127.0.0.1:3000/submit";

userDataForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text(); // response.text() для получения текста ответа
    document.getElementById("responseMessage").innerText = result;
  } catch (error) {
    console.error("Error sending data:", error);
    document.getElementById("responseMessage").innerText = "Error sending data"; // Отображаем сообщение об ошибке
  }
});
