// backend/server.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// ----- Setup diretórios para ES Module -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------- ROTAS DA API ----------
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Pong!' });
});

app.get('/api/mercadolivre/token', async (req, res) => {
  const clientId = process.env.MERCADO_LIVRE_CLIENT_ID;
  const clientSecret = process.env.MERCADO_LIVRE_CLIENT_SECRET;
  const redirectUri = process.env.MERCADO_LIVRE_REDIRECT_URI;

  res.json({ clientId, clientSecret, redirectUri });
});

// ---------- SERVIR FRONTEND REACT ----------
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// SPA fallback (somente rotas que não começam com /api)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
