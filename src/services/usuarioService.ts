import Usuario from '../models/Usuario.js';

export class UsuarioService {
  // Metodo para registrar un usuario validando que el correo no este repetido
  public static async registrarUsuario(data: { nombre: string; correo: string; contrasena: string; rol: 'Administrador' | 'Gestor' }) {
    // Buscar si ya existe un usuario con el mismo correo electronico
    const existeUsuario = await Usuario.findOne({ where: { correo: data.correo } });
    
    // Si existe, lanzamos un error para evitar el duplicado
    if (existeUsuario) {
      throw new Error('El correo electronico ya se encuentra registrado');
    }

    // Si no existe, creamos el registro en la base de datos
    const nuevoUsuario = await Usuario.create(data);
    return nuevoUsuario;
  }

  // Metodo para listar todos los usuarios registrados
  public static async obtenerUsuarios() {
    return await Usuario.findAll();
  }
}
    