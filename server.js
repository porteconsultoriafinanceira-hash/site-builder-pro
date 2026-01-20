import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import checkoutRoutes from "./routes/checkout.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", checkoutRoutes);

app.get("/", (req, res) => {
  res.send("API rodando com sucesso");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port', PORT);
});
