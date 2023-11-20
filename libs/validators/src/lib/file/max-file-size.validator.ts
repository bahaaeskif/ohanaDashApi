export abstract class FileValidator<TValidationOptions = Record<string, any>> {
  constructor(protected readonly validationOptions: TValidationOptions) {}

  /**
   * Indicates if this file should be considered valid, according to the options passed in the constructor.
   * @param file the file from the request object
   */
  abstract isValid(file?: any): boolean | Promise<boolean>;

  /**
   * Builds an error message in case the validation fails.
   * @param file the file from the request object
   */
  abstract buildErrorMessage(file: any): string;
}

export class MaxFileSizeValidator extends FileValidator {
  buildErrorMessage(file: any): string {
    return `file size must not exceed ${4}`;
  }

  isValid(file: any): boolean | Promise<boolean> {
    const oneKb = 1000;
    return file.size < oneKb;
  }
}
