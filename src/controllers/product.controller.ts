import { Request, Response, NextFunction } from "express"; // Importa los tipos Request, Response y NextFunction de Express.
import Product from "../models/product.model"; // Importa el modelo de producto.
import IProduct from "../interfaces/product.interface"; // Importa la interfaz IProduct para definir la estructura de producto.
import { NotFoundException } from "../utils/http.exception"; // Importa una excepción personalizada para recursos no encontrados.

// Controlador para obtener todos los productos
export const index = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const products = await Product.find(); // Busca y obtiene todos los productos desde la base de datos.
   console.log(products);
    return res.status(200).json(products); // Devuelve la lista de productos en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para crear un nuevo producto
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nombre, descripcion, precio, rol, imagenUrl } = req.body;
  
      // Crea una nueva instancia del modelo de producto
      const product:IProduct = new Product({
        nombre,
        descripcion,
        precio,
        rol,
        imagenUrl,
      });
  
      // Guarda el producto en la base de datos
      const savedProduct = await product.save();
  
      return res.status(200).json(savedProduct);
    } catch (error) {
      next(error);
    }
  };
// Controlador para obtener un producto por su ID
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // Obtiene el ID del producto de los parámetros de la solicitud.
    const product = await Product.findById(id).orFail( // Busca un producto por ID y lanza una excepción si no se encuentra.
      new NotFoundException("Product not found") // Usa la excepción personalizada "Product not found" en caso de no encontrar al producto.
    );
    return res.status(200).json(product); // Devuelve el producto encontrado en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};

// Controlador para borrar un producto por su ID
export const destroy = async (
  req: Request, // Objeto de solicitud HTTP.
  res: Response, // Objeto de respuesta HTTP.
  next: NextFunction // Función de middleware siguiente.
) => {
  try {
    const { id } = req.params; // Obtiene el ID del producto de los parámetros de la solicitud.
    const product = await Product.findById(id).orFail( // Busca un producto por ID y lanza una excepción si no se encuentra.
      new NotFoundException("Product not found") // Usa la excepción personalizada "Product not found" en caso de no encontrar al producto.
    );
    await product.deleteOne(); // Borra el producto de la base de datos.
    return res.status(200).json(product); // Devuelve el producto borrado en formato JSON con código de estado 200 (Éxito).
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores.
  }
};
