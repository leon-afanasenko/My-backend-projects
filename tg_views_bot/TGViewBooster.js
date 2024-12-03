const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.json());

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15";

// Создаем сессию через axios
const session = axios.create({
  headers: { "User-Agent": USER_AGENT },
  validateStatus: () => true,
});

// Первый запрос к Telegram
async function firstGetRequest(url) {
  try {
    const response = await session.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error in first GET request: " + error.message);
  }
}

// Второй запрос к Telegram
async function secondGetRequest(url) {
  try {
    const response = await session.get(url + "?embed=1&mode=tme");
    return response.data;
  } catch (error) {
    throw new Error("Error in second GET request: " + error.message);
  }
}

// Извлечение токена из HTML
function extractToken(html) {
  const $ = cheerio.load(html);
  const message = $(".tgme_widget_message").attr("data-view");
  return message || null;
}

// Извлечение количества просмотров
function extractViewCount(html) {
  const $ = cheerio.load(html);
  const views = $(".tgme_widget_message_views").text();
  return views ? parseInt(views, 10) : null;
}

// POST-запрос к Telegram
async function thirdPostRequest(url) {
  try {
    const response = await session.post(url + "?embed=1&mode=tme", "_rl=1", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error in third POST request: " + error.message);
  }
}

// Четвертый запрос к Telegram
async function fourthGetRequest(url, token) {
  try {
    const response = await session.get(`https://t.me/v/?views=${token}`);
    return response.data;
  } catch (error) {
    throw new Error("Error in fourth GET request: " + error.message);
  }
}

app.get("/", (req, res) => {
  res.send("Server is running! Use POST /start to interact.");
});

app.post("/start", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    // Первый запрос
    const htmlBefore = await secondGetRequest(url);
    const viewCountBefore = extractViewCount(htmlBefore);
    const token = extractToken(htmlBefore);

    if (!token) return res.status(400).json({ error: "No token found" });

    // Третий запрос
    await thirdPostRequest(url);

    // Четвертый запрос
    await fourthGetRequest(url, token);

    // Проверяем количество просмотров после запроса
    const htmlAfter = await secondGetRequest(url);
    const viewCountAfter = extractViewCount(htmlAfter);

    if (viewCountBefore === null || viewCountAfter === null) {
      return res.status(400).json({ error: "Could not determine view count" });
    }

    const viewAdded = viewCountAfter > viewCountBefore;

    res.status(200).json({
      view_added: viewAdded,
      total_views: viewCountAfter,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
