export class ErrorOr<T> {
  isSuccessful: boolean = true;
  result: T | null = null;
  Errors: string[] = [];
}
