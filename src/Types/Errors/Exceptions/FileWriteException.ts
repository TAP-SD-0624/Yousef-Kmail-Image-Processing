export class FileWriteException extends Error {
  constructor(message: string = "Error writing the file to the system") {
    super(message);
  }
}
