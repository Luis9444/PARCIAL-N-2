import mongoose from "mongoose"; // Importa la biblioteca Mongoose para interactuar con MongoDB.
import logger from "../utils/logger"; // Importa el objeto de registro personalizado.

// Función de configuración para establecer una conexión a la base de datos.
export const configure = async () => {
  try {
    // Intenta conectarse a la base de datos MongoDB en la dirección especificada.
    await mongoose.connect("mongodb://127.0.0.1:27017/database-luis");

    // Registra un mensaje de información indicando que se ha conectado a la base de datos con éxito.
    logger.info("🟢 Connected to the database");
  } catch (error) {
    // En caso de error, registra un mensaje de error junto con la información del error.
    logger.error("🔴 Error connecting to the database:", error);
  }
};
