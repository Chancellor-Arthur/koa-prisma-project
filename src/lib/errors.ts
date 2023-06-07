// eslint-disable-next-line max-classes-per-file
export enum ErrorStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  Dismissal = 410,
  Uniq = 432,
}

class HttpError extends Error {
  status: number;
  public constructor(public code: number, message: unknown, context: unknown = null) {
    super('');
    this.status = code;
    // @ts-ignore
    this.message = message;
    // @ts-ignore
    this.context = context;
  }
}

class AppError {
  constructor(code: number, message?: unknown, context?: unknown) {
    throw new HttpError(code, message || ErrorStatusCode[code], context);
  }
}

export class BadRequestError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.BadRequest, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.Unauthorized, message);
  }
}

export class DismissalError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.Dismissal, message);
  }
}

export class ConflictError extends AppError {
  constructor(message?: unknown, context?: unknown) {
    super(ErrorStatusCode.Conflict, message, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.Forbidden, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.NotFound, message);
  }
}

export class UniqError extends AppError {
  constructor(message?: unknown) {
    super(ErrorStatusCode.Uniq, message);
  }
}
