import { Document } from "mongoose";
interface IProduct extends Document {
    nombre: string;
    descripcion: string;
    precio: string;
    rol: string;
    imagenUrl: string;
    validarContraseña(contraseña: string): Promise<boolean>;
    guardarContraseña(): Promise<boolean>;
  }
  
  export default IProduct;
  