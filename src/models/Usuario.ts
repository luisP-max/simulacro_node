import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid'; // Importamos la funcion para generar UUID version 4
import sequelize from '../config/database.js';

export class Usuario extends Model {
  public id!: string; // Cambiado de number a string para soportar el formato UUID
  public nombre!: string;
  public correo!: string;
  public contrasena!: string;
  public rol!: 'Administrador' | 'Gestor';
  public estado!: 'Activo' | 'Inactivo';
}

Usuario.init(
  {
    id: {
      type: DataTypes.UUID, // Definimos el tipo de dato como UUID nativo
      defaultValue: () => uuidv4(), // Asignamos la generacion automatica al crear un registro
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true, // Regla: El correo electronico no puede estar repetido
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
        isIn: [['Administrador', 'Gestor']], // Roles disponibles del sistema
      },
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Activo',
      validate: {
        isIn: [['Activo', 'Inactivo']], // Manejo de borrado logico
      },
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
  }
);

export default Usuario;
