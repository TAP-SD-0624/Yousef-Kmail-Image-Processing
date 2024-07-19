export class SharpChangesException extends Error {
  constructor(
    message: string = "Provided data for this sharp changes were invalid"
  ) {
    super(message);
  }
}
