import { Request, Response, NextFunction } from "express"; // Importa los tipos Request, Response y NextFunction de Express.
import User from "../models/user.model"; // Importa el modelo de usuario.
import IUser from "../interfaces/user.interface"; // Importa la interfaz IUser para definir la estructura de usuario.
import { NotFoundException } from "../utils/http.exception"; // Importa una excepción personalizada para recursos no encontrados.

// Controlador para obtener todos los usuarios
export const index = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const users = await User.find(); // Busca y obtiene todos los usuarios desde la base de datos.
    return res.status(200).json(users); // Devuelve la lista de usuarios en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para crear un nuevo usuario
export const create = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const { nombre, email, contraseña, rol } = req.body; // Obtiene datos del cuerpo de la solicitud.

    const user: IUser = new User({ // Crea una nueva instancia de usuario con los datos proporcionados.
      nombre,
      email,
      contraseña,
      rol,
      imageUrl:"prueba",
    });

    const userbd= await user.save(); // Guarda el usuario en la base de datos.

    return res.status(200).json(userbd); // Devuelve el usuario creado en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para obtener un usuario por su ID
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // Obtiene el ID del usuario de los parámetros de la solicitud.
    const user = await User.findById(id).orFail( // Busca un usuario por ID y lanza una excepción si no se encuentra.
      new NotFoundException("User not found") // Usa la excepción personalizada "User not found" en caso de no encontrar al usuario.
    );
    return res.status(200).json(user); // Devuelve el usuario encontrado en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para borrar un usuario por su ID
export const destroy = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const { id } = req.params; // Obtiene el ID del usuario de los parámetros de la solicitud.
    const user = await User.findById(id).orFail( // Busca un usuario por ID y lanza una excepción si no se encuentra.
      new NotFoundException("User not found") // Usa la excepción personalizada "User not found" en caso de no encontrar al usuario.
    );
    await user.deleteOne(); // Borra el usuario de la base de datos.
    return res.status(200).json(user); // Devuelve el usuario borrado en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};
