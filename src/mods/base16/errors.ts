export type CodingError =
  | EncodingError
  | DecodingError

export class EncodingError extends Error {
  readonly #class = DecodingError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not encode`, options)
  }

  static from(cause: unknown) {
    return new EncodingError({ cause })
  }

}

export class DecodingError extends Error {
  readonly #class = DecodingError
  readonly name = this.#class.name

  constructor(options: ErrorOptions) {
    super(`Could not decode`, options)
  }

  static from(cause: unknown) {
    return new DecodingError({ cause })
  }

}