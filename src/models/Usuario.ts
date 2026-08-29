import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public correo!: string;
  public contrasena!: string;
  public rol!: 'Administrador' | 'Gestor';
  public estado!: 'Activo' | 'Inactivo';
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true, // Regla: El correo electrónico no puede estar repetido
      validate: {
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['Administrador', 'Gestor']], // Roles disponibles
      },
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Activo',
      validate: {
        isIn: [['Activo', 'Inactivo']], // Borrado lógico (Regla 13)
      },
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false, // Alineado al diseño inicial del script
  }
);

export default Usuario;
