import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const router = Router();

// Definicion de rutas asignando su respectivo controlador
router.post('/', UsuarioController.crear);
router.get('/', UsuarioController.listar);

export default router;
