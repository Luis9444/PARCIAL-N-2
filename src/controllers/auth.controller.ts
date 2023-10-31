import jwt from "jsonwebtoken"; // Importa la biblioteca JWT para la generación y verificación de tokens.
import { Request, Response, NextFunction } from "express"; // Importa los tipos Request, Response y NextFunction de Express.
import User from "../models/user.model"; // Importa el modelo de usuario.
import IUser from "../interfaces/user.interface"; // Importa la interfaz IUser para definir la estructura de usuario.
import {
  BadRequestException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/http.exception"; // Importa excepciones personalizadas para manejar errores HTTP.

// Controlador para registrar un nuevo usuario
export const signup = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const { nombre, email, contraseña, rol } = req.body; // Obtiene datos del cuerpo de la solicitud.

    if (await User.findOne({ email })) { // Verifica si ya existe un usuario con el mismo correo.
      throw new BadRequestException("The user is already registered"); // Lanza una excepción si el usuario ya está registrado.
    }

    let user: IUser = new User({ // Crea una nueva instancia de usuario con los datos proporcionados.
      nombre,
      email,
      contraseña,
      rol,
    });

    if ((await user.guardarContraseña()) === false) { // Intenta cifrar la contraseña del usuario.
      throw new BadRequestException("Password encryption failed"); // Lanza una excepción si la encriptación falla.
    }

    await user.save(); // Guarda el nuevo usuario en la base de datos.

    // Devolver datos del usuario recién creado
    const userData = await User.findById(user._id).orFail(
      new NotFoundException("User Data not found") // Busca y obtiene los datos del usuario recién creado o lanza una excepción si no se encuentra.
    );
    return res.json(userData); // Devuelve los datos del usuario en formato JSON.
  } catch (err) {
    next(err); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para iniciar sesión de usuario
export const login = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const user: IUser = await User.findOne({ email: req.body.email }) // Busca un usuario por correo electrónico.
      .select("+contraseña") // Incluye la contraseña en la consulta (ya que generalmente se excluye por defecto).
      .orFail(new NotFoundException("User not found")); // Lanza una excepción si el usuario no se encuentra.

    if (!user.contraseña) { // Verifica si la contraseña del usuario está presente.
      throw new HttpException(401, "Unauthorized, missing password"); // Lanza una excepción si falta la contraseña.
    }

    const correctPassword = await user.validarContraseña(req.body.contraseña); // Valida la contraseña proporcionada.
    if (!correctPassword) { // Verifica si la contraseña no es válida.
      throw new UnauthorizedException("Invalid Password"); // Lanza una excepción si la contraseña es incorrecta.
    }

    // Crear un token JWT para el usuario autenticado
    const token: string = jwt.sign(
      { sub: user._id }, // Carga el ID de usuario en el token.
      process.env.JWT_SECRET || "", // Utiliza una clave secreta del entorno o cadena vacía como secreto.
      {
        expiresIn: process.env.JWT_EXPIRATION, // Define la expiración del token desde el entorno.
      }
    );

    const { contraseña, ...data } = user.toJSON(); // Excluye la contraseña de los datos del usuario.
    return res.header("auth-token", token).json({ ...data, token }); // Devuelve los datos del usuario y el token JWT en la respuesta.
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};
