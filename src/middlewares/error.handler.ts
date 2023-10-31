import { HttpException } from "../utils/http.exception"; // Importa la clase HttpException desde un archivo de utilidades.
import { NextFunction, Request, Response } from "express"; // Importa los tipos Request, Response y NextFunction de Express.
import logger from "../utils/logger"; // Importa el módulo de registro de eventos personalizado.

// Middleware de manejo de errores
const errorHandler = (
  err: HttpException, // Objeto de error personalizado.
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  const status = err.status || 500; // Obtiene el código de estado del error o utiliza 500 (Error interno del servidor) si no se proporciona.
  const message = err.message || "Internal Server Error"; // Obtiene el mensaje de error o utiliza un mensaje predeterminado si no se proporciona.

  logger.error(`Error ${status} - ${message}`); // Registra el error en el módulo de registro de eventos personalizado.

  return res.status(status).json({
    status, // Devuelve el código de estado en la respuesta JSON.
    message, // Devuelve el mensaje de error en la respuesta JSON.
  });
};

export default errorHandler; // Exporta el middleware de manejo de errores para su uso en la aplicación.
