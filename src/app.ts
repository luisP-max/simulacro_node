import express from 'express';
import dotenv from 'dotenv';
import sequelize, { testConnection } from './config/database.js';
import './models/Usuario.js'; // Importamos el modelo para que Sequelize lo reconozca

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Probar conexión y sincronizar tablas
const initApp = async () => {
  await testConnection();
  try {
    // alter: true actualiza la tabla en la base de datos si haces cambios en el modelo
    await sequelize.sync({ alter: true });
    console.log(' Tablas sincronizadas correctamente en la base de datos.');
  } catch (error) {
    console.error(' Error al sincronizar las tablas:', error);
  }
};

initApp();

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de AutoParts funcionando' });
});

app.listen(PORT, () => {
  console.log(`⚡ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;