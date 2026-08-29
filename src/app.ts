import express from 'express';
import dotenv from 'dotenv';
import sequelize, { testConnection } from './config/database.js';
import './models/Usuario.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir que Express entienda el formato JSON en el body
app.use(express.json());

// Registro de las rutas modulares de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Inicializacion asincrona del servidor y base de datos
const initApp = async () => {
  await testConnection();
  try {
    // Sincroniza el modelo con la base de datos de Docker
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente en la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  }
};

initApp();

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor de AutoParts funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
