import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ✅ YOUR ACTUAL RENDER BACKEND URL
const RENDER_URL = "https://dss-2yuu.onrender.com/api/iot/ingest/sensors/";

app.post("/iot", async (req, res) => {
  try {
    const response = await fetch(RENDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

app.listen(8080, () => {
  console.log("Proxy running on port 8080");
});
