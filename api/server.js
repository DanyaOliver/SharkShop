import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, phone, message } = req.body;

    const telegramMessage = `Новая заявка с сайта:\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      telegramMessage
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        return res.status(200).json({ message: "Сообщение отправлено!" });
      } else {
        return res
          .status(500)
          .json({ error: "Ошибка при отправке сообщения." });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      return res.status(500).json({ error: "Ошибка при отправке сообщения." });
    }
  } else {
    return res.status(405).json({ error: "Метод не поддерживается." });
  }
}
