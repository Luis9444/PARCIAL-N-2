import { Router } from "express"; // Importa el enrutador de Express.
import * as userController from "../controllers/user.controller"; // Importa el controlador de usuarios.
import { authMiddleware } from "../middlewares/auth.middleware"; // Importa el middleware de autenticación.
import { authSignupValidators } from "../middlewares/validators/validators";
import { handleValidationErrors } from "../middlewares/validation.middleware";
const router = Router().use(authMiddleware); // Crea una instancia de enrutador y aplica el middleware de autenticación a todas las rutas definidas a continuación.

// RUTA PARA OBTENER TODOS LOS USUARIOS
router.get("/", userController.index); // Asocia la ruta "/" a la función de controlador "index" para obtener todos los usuarios.

// RUTA PARA CREAR UN USUARIO
router.post("/",...authSignupValidators,handleValidationErrors, userController.create,); // Asocia la ruta "/" a la función de controlador "create" para crear un usuario.

// RUTA PARA OBTENER UN USUARIO POR SU ID
router.get("/:id", userController.show); // Asocia la ruta "/:id" a la función de controlador "show" para obtener un usuario por su ID.

// RUTA PARA BORRAR UN USUARIO POR SU ID
router.delete("/:id", userController.destroy); // Asocia la ruta "/:id" a la función de controlador "destroy" para borrar un usuario por su ID.

export default router; // Exporta el enrutador configurado con las rutas y el middleware de autenticación aplicado.
