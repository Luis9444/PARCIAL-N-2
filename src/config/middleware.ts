import cors from "cors"; // Importa la biblioteca "cors" para gestionar los encabezados CORS.
import express, { Application } from "express"; // Importa Express y el tipo Application.
import morgan from "morgan"; // Importa la biblioteca "morgan" para el registro de solicitudes HTTP.
import * as dotenv from "dotenv"; // Importa la biblioteca "dotenv" para configurar las variables de entorno.
import errorHandler from "../middlewares/error.handler"; // Importa el middleware de manejo de errores.
import logger from "../utils/logger"; // Importa el módulo de registro de eventos personalizado.

export const configure = async (app: Application) => {
  dotenv.config(); // Configura las variables de entorno utilizando el archivo ".env".

  // Configura el middleware "morgan" para el registro de solicitudes HTTP en formato "dev".
  app.use(
    morgan("dev", {
      stream: {
        write: (message: string) => {
          logger.info(message.trim()); // Esto registrará cada solicitud HTTP en tu logger.
        },
      },
    })
  );

  app.use(cors()); // Configura el middleware "cors" para habilitar la seguridad de acceso a recursos cruzados (CORS).
  app.use(express.urlencoded({ extended: false })); // Configura el middleware "urlencoded" de Express para analizar datos codificados en URL.
  app.use(express.json()); // Configura el middleware "json" de Express para analizar datos JSON en las solicitudes.

  logger.info("🟢 Middlewares configurated"); // Registra un mensaje informativo indicando que los middlewares se han configurado correctamente.
};
