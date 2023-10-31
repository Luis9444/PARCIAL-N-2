import { model, Schema } from "mongoose"; // Importa el modelo y el esquema de Mongoose.
import IUser from "../interfaces/user.interface"; // Importa la interfaz IUser para definir la estructura del usuario.
import bcrypt from "bcrypt"; // Importa la biblioteca bcrypt para el cifrado de contraseñas.

// Define el esquema del usuario en Mongoose
const UserSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"], // Campo "nombre" de tipo String y requerido.
    },
    email: {
      type: String,
      unique: true, // Campo "email" de tipo String, único, requerido y en minúsculas.
      required: [true, "El email es obligatorio y único"],
      lowercase: true,
      trim: true,
    },
    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"], // Campo "contraseña" de tipo String y requerido (pero no se selecciona por defecto).
      select: false,
    },
    rol: {
      type: String,
      lowercase: true, // Campo "rol" de tipo String en minúsculas.
      default: "usuario", // Valor predeterminado "usuario".
      enum: ["admin", "usuario"], // Solo se permite "admin" o "usuario".
    },

    imageUrl: {
      type: String, // Nuevo campo "imageUrl" de tipo String para la URL de la imagen del producto.
      
    },


  },
  {
    timestamps: { createdAt: true, updatedAt: true }, // Habilita campos de tiempo de creación y actualización.
  }
);

// Método para cifrar y guardar la contraseña del usuario
UserSchema.methods.guardarContraseña =
  async function guardarContraseña(): Promise<boolean> {
    const user = this as any; // Accede al usuario actual.
    const salt = await bcrypt.genSalt(10); // Genera un salt (valor aleatorio) para el cifrado.
    user.contraseña = await bcrypt.hash(user.contraseña, salt); // Aplica el cifrado a la contraseña del usuario.
    return true;
  };

// Método para validar la contraseña del usuario
UserSchema.methods.validarContraseña = function validarContraseña(
  contraseña: string
): Promise<boolean> {
  return bcrypt.compare(contraseña, (this as any).contraseña); // Compara la contraseña proporcionada con la contraseña almacenada.
};

export default model<IUser>("User", UserSchema); // Exporta el modelo de usuario definido en Mongoose.
