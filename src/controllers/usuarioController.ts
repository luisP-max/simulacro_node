import type { Request, Response } from 'express'; // Corregido: Se agrega "type" para cumplir con la regla estricta de modulos
import { UsuarioService } from '../services/usuarioService.js';

export class UsuarioController {
  // Manejador para la creacion de usuarios (POST)
  public static async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, correo, contrasena, rol } = req.body;
      
      // Validacion simple de campos obligatorios en la peticion
      if (!nombre || !correo || !contrasena || !rol) {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
        return;
      }

      // Llamada al servicio para ejecutar la logica de negocio
      const usuario = await UsuarioService.registrarUsuario({ nombre, correo, contrasena, rol });
      res.status(201).json(usuario);
    } catch (error: any) {
      // Captura de errores de validacion o de correo duplicado
      res.status(400).json({ error: error.message });
    }
  }

  // Manejador para listar usuarios (GET)
  public static async listar(req: Request, res: Response): Promise<void> {
    try {
      // Llamada al servicio para obtener la lista completa
      const usuarios = await UsuarioService.obtenerUsuarios();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
