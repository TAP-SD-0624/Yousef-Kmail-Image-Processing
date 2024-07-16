export class ApplicationError extends Error {
  statusCode: number = 500;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
