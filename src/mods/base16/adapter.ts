import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { Option, Some } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

let global: Option<Adapter> = new Some(fromBuffer())

export function get() {
  return global.unwrap()
}

export function set(value?: Adapter) {
  global = Option.wrap(value)
}

export interface Adapter {
  encodeOrThrow(bytes: BytesOrCopiable): string
  tryEncode(bytes: BytesOrCopiable): Result<string, EncodingError>

  padStartAndDecodeOrThrow(text: string): Copiable
  tryPadStartAndDecode(text: string): Result<Copiable, DecodingError>

  padEndAndDecodeOrThrow(text: string): Copiable
  tryPadEndAndDecode(text: string): Result<Copiable, DecodingError>
}

