import User from "../models/user.model"; // Importa el modelo de usuario.
import Product from "../models/product.model"; // Importa el modelo de usuario.

import { NextFunction, Request, Response } from "express"; // Importa tipos Request, Response y NextFunction de Express.
import jwt from "jsonwebtoken"; // Importa la biblioteca jwt para trabajar con tokens JWT.
import { HttpException, UnauthorizedException } from "../utils/http.exception"; // Importa excepciones personalizadas.

// Middleware de autenticación
export const authMiddleware = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException("Missing authorization header."); // Lanza una excepción personalizada si no se proporciona un encabezado de autorización.

    req.token = req.headers.authorization.split(" ")[1]; // Extrae el token del encabezado de autorización.

    // Verifica y decodifica el token JWT utilizando la clave secreta (o una cadena vacía si no está definida en el entorno).
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || "") as any;
    if (!decoded) throw new UnauthorizedException("Unauthorized."); // Lanza una excepción si la verificación del token falla.

    // Busca al usuario en la base de datos utilizando el identificador (sub) del token.
    const userFound = await User.findById(decoded.sub);
    if (!userFound) throw new UnauthorizedException("Unauthorized."); // Lanza una excepción si no se encuentra al usuario.

    req.user = userFound; // Almacena la información del usuario en el objeto de solicitud para su uso posterior.
    next(); // Llama a la función de middleware siguiente.
  } catch (error) {
    return next(error); // Maneja cualquier error lanzado durante la autenticación y pasa el control al middleware de manejo de errores.
  }
};
