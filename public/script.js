document
  .getElementById("telegramForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;

    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("/sendToTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("Форма успешно отправлена!", "success");
        document.getElementById("telegramForm").reset(); // Очистить форму после успешной отправки
      } else {
        const errorMessage = "Ошибка при отправке формы.";
        showNotification(`Ошибка: ${errorMessage}`, "error");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      showNotification(`Ошибка: ${error.message}`, "error");
    } finally {
      submitButton.disabled = false;
    }
  });

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000); // Уведомление исчезает через 3 секунды
}
