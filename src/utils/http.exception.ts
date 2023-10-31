// Clase base para excepciones HTTP personalizadas
export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// Clase de excepción para recursos no encontrados (estatus 404)
export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

// Clase de excepción para solicitudes incorrectas (estatus 400)
export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

// Clase de excepción para acceso no autorizado (estatus 401)
export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}






