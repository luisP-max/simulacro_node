import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'autoparts_supply_db',
  process.env.DB_USER || 'luis',
  process.env.DB_PASSWORD || 'luis123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: false, 
    define: {
      timestamps: false
    }
  }
);

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
  }
};

export default sequelize;
