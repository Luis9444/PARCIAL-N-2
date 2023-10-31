import { Router } from "express"; // Importa el enrutador de Express.
import * as authController from "../controllers/auth.controller"; // Importa el controlador de autenticación.
import {
  authLoginValidators,
  authSignupValidators, // Importa los validadores de autenticación para registro y inicio de sesión.
} from "../middlewares/validators/validators"; // Importa validadores de usuario.
import { handleValidationErrors } from "../middlewares/validation.middleware"; // Importa el middleware de manejo de errores de validación.

const router = Router(); // Crea una instancia de enrutador.

// RUTA PARA REGISTRAR UN USUARIO
router.post(
  "/signup", // Ruta para registrar un usuario.
  ...authSignupValidators, // Aplica los validadores de registro antes de ejecutar el controlador.
  handleValidationErrors, // Middleware para manejar errores de validación.
  authController.signup // Controlador para el registro de usuario.
);

// RUTA PARA INICIAR SESIÓN
router.post(
  "/login", // Ruta para iniciar sesión.
  ...authLoginValidators, // Aplica los validadores de inicio de sesión antes de ejecutar el controlador.
  handleValidationErrors, // Middleware para manejar errores de validación.
  authController.login // Controlador para iniciar sesión.
);

export default router; // Exporta el enrutador configurado con las rutas y middlewares.
