import { createLogger, format, transports } from "winston"; // Importa las funciones y módulos necesarios de Winston.

const { combine, timestamp, printf } = format; // Extrae funciones de formato de Winston.

// Define un formato personalizado para los registros.
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Crea un objeto de registrador de Winston con configuraciones personalizadas.
const logger = createLogger({
  format: combine(timestamp(), myFormat), // Configura el formato de registro con marca de tiempo personalizada.
  transports: [
    new transports.Console(), // Agrega un transporte de consola para mostrar registros en la salida estándar.
    new transports.File({ filename: "logs/app.log" }), // Agrega un transporte de archivo para almacenar registros en un archivo "app.log".
  ],
});

export default logger; // Exporta el objeto de registrador configurado para su uso en otras partes de la aplicación.
