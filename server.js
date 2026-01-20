import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// Serve Frontend
app.use(express.static("dist"));

// Endpoint para criar preference
app.post("/api/create_preference", async (req, res) => {
  try {
    const { items } = req.body;
    const preference = {
      items,
      back_urls: {
        success: "https://seusite.com/success",
        failure: "https://seusite.com/failure"
      },
      auto_return: "approved",
    };

    const mpRes = await mercadopago.preferences.create(preference);
    return res.json({ id: mpRes.body.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error creating preference" });
  }
});

// Fallback para SPA
app.get("*", (_, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
