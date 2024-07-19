export class FileReadException extends Error {
  constructor(message: string = "Could not read this file from the system") {
    super(message);
  }
}
