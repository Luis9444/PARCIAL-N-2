import { Request, Response, NextFunction } from 'express'; // Importa tipos Request, Response y NextFunction de Express.
import { validationResult } from 'express-validator'; // Importa la función validationResult de express-validator para verificar resultados de validación.
import { BadRequestException } from '../utils/http.exception'; // Importa una excepción personalizada para errores de solicitud incorrecta.
import logger from '../utils/logger'; // Importa un módulo de registro de eventos personalizado.

// Middleware para manejar errores de validación
export const handleValidationErrors = (
    req: Request, // Objeto de solicitud HTTP.
    res: Response, // Objeto de respuesta HTTP.
    next: NextFunction // Función de middleware siguiente.
) => {
    const errors = validationResult(req); // Verifica los resultados de validación en la solicitud actual.

    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(err => err.msg).join(', '); // Genera un mensaje de error concatenando los mensajes de error.
        logger.error(`Validation Error: ${errorMessage}`); // Registra el error de validación en el módulo de registro personalizado.

        throw new BadRequestException(errorMessage); // Lanza una excepción de solicitud incorrecta con el mensaje de error.
    }

    next(); // Si no hay errores de validación, pasa el control al siguiente middleware.
};
