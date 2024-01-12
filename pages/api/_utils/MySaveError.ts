export enum MySaveErrorType {
  MySaveNotFound = 'MySaveNotFoundError',
  MySaveInternalServerError = 'MySaveInternalServerError',
  MySaveExternalApiError = 'MySaveExternalApiError',
}

export class MySaveError extends Error {
  constructor(message: string, type: MySaveErrorType) {
    super(`${message} : ${type}`)
  }
}

export interface ErrorResponse {
  error: string
}