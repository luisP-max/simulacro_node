import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Probar conexión a la base de datos
testConnection();

// Endpoint de prueba de salud de la API
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de AutoParts funcionando' });
});

app.listen(PORT, () => {
  console.log(`⚡ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;