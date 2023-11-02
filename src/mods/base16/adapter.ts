import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { Nullable } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

let global: Nullable<Adapter> = fromBuffer()

export function get() {
  if (global == null)
    throw new Error("No Base16 adapter found")
  return global
}

export function set(value?: Nullable<Adapter>) {
  global = value
}

export interface Adapter {
  encodeOrThrow(bytes: BytesOrCopiable): string
  tryEncode(bytes: BytesOrCopiable): Result<string, EncodingError>

  padStartAndDecodeOrThrow(text: string): Copiable
  tryPadStartAndDecode(text: string): Result<Copiable, DecodingError>

  padEndAndDecodeOrThrow(text: string): Copiable
  tryPadEndAndDecode(text: string): Result<Copiable, DecodingError>
}

