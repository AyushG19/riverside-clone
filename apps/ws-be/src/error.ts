export class AppError extends Error{
  public code: number;
  public status: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.status = code.toString().startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export errorHandler
