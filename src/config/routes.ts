import { Application } from "express"; // Importa la clase Application de Express.
import userRoutes from "../routes/user.routes"; // Importa las rutas relacionadas con usuarios.
import authRoutes from "../routes/auth.routes"; // Importa las rutas relacionadas con autenticación.
import productRoutes from "../routes/product.routes";
import logger from "../utils/logger"; // Importa el objeto de registro personalizado.

// Función para registrar rutas en la aplicación Express.
export const register = async (app: Application) => {
  // Agrega las rutas relacionadas con usuarios en la aplicación bajo la ruta "/users".
  app.use("/users", userRoutes);

  // Agrega las rutas relacionadas con autenticación en la aplicación bajo la ruta "/auth".
  app.use("/auth", authRoutes);

  app.use("/products", productRoutes);

  // Registra un mensaje de información indicando que las rutas se han registrado con éxito.
  logger.info("🟢 Routes registered");
};
