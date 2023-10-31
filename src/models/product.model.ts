import { model, Schema } from "mongoose";
import IProduct from "../interfaces/product.interface";
import bcrypt from "bcrypt";

const ProductSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
     
    },
    descripcion: {
      type: String,
      required: [true, "El nombre es obligatorio"],
     
      
    },
    precio: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
     
    },
    rol: {
      type: String,
      lowercase: true,
      default: "producto",
      enum: ["admin", "producto"],
    },
    imagenUrl: {
      type: String, // Nuevo campo "imagenUrl" de tipo String para la URL de la imagen del producto.
      required: [true, "La imagen es obligatoria"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

ProductSchema.methods.guardarContraseña = async function guardarContraseña(): Promise<boolean> {
  const product = this as any;
  const salt = await bcrypt.genSalt(10);
  product.contraseña = await bcrypt.hash(product.contraseña, salt);
  return true;
};

ProductSchema.methods.validarContraseña = function validarContraseña(contraseña: string): Promise<boolean> {
  return bcrypt.compare(contraseña, (this as any).contraseña);
};

export default model<IProduct>("Product", ProductSchema);
