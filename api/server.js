import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/sendToTelegram", (req, res) => {
  const { name, phone, message } = req.body;

  const telegramMessage = `Новая заявка с сайта:\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    telegramMessage
  )}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        res.send("Сообщение отправлено!");
      } else {
        res.status(500).send("Ошибка при отправке сообщения.");
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      res.status(500).send("Ошибка при отправке сообщения.");
    });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
