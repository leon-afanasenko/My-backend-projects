const form = document.getElementById("upload-form");
const imageInput = document.getElementById("image-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const file = imageInput.files[0];
  if (!file) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Server response:", result);
    alert(result.message);
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Failed to upload image.");
  }
});
