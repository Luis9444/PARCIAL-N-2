import { check, ValidationChain } from "express-validator";

// Validadores para la autenticación en el inicio de sesión
export const authLoginValidators: Array<ValidationChain> = [
  // Validación del campo "email"
  check("email")
    .isEmail() // Verifica si el valor es un correo electrónico válido.
    .withMessage("El email no es válido"), // Mensaje de error si la validación falla.

  // Validación del campo "contraseña"
  check("contraseña")
    .isLength({ min: 6 }) // Verifica si el valor tiene al menos 6 caracteres.
    .withMessage("La contraseña debe tener al menos 6 caracteres"), // Mensaje de error si la validación falla.
];

// Validadores para la autenticación en el registro
export const authSignupValidators: Array<ValidationChain> = [
  // Validación del campo "nombre"
  check("nombre")
    .notEmpty() // Verifica que el campo no esté vacío.
    .withMessage("El nombre es obligatorio"), // Mensaje de error si la validación falla.

  // Validación del campo "email"
  check("email")
    .isEmail() // Verifica si el valor es un correo electrónico válido.
    .withMessage("El email no es válido"), // Mensaje de error si la validación falla.

  // Validación del campo "contraseña"
  check("contraseña")
    .isLength({ min: 6 }) // Verifica si el valor tiene al menos 6 caracteres.
    .withMessage("La contraseña debe tener al menos 6 caracteres"), // Mensaje de error si la validación falla.

  // Validación del campo "rol"
  check("rol")
    .isIn(["admin", "usuario"]) // Verifica que el valor esté dentro de las opciones ["admin", "usuario"].
    .withMessage("El rol debe ser 'admin' o 'usuario'"), // Mensaje de error si la validación falla.

    check("imageUrl")  
    .notEmpty()
    .isURL()
    .withMessage("Error la imagen es una URL")




];

// Validadores para la autenticación de producto
export const productValidators: Array<ValidationChain> = [
  // Validación del campo "nombre"
  check("nombre")
    .notEmpty()
    .isLength({min:3, max:20})
    .isLowercase()
    .withMessage("El nombre es obligatorio"),

  // Validación del campo "descripcion"
  check("descripcion")
  .notEmpty()
  .isLength({min:0, max:10})
  .withMessage("La descripcion es Obligatoria"),

  // Validación del campo "precio"
  check("precio")
  .notEmpty()
  .isFloat({min:0,})
  .withMessage("El precio es Obligatorio"),

  // Validación del campo "rol"
  check("rol")
    .isIn(["admin", "usuario"])
    .withMessage("El rol debe ser 'admin' o 'usuario"),

    check("imagenUrl")  
    .isURL()
    .withMessage("Error la imagen es una URL")

];

