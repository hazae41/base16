import { Nullable, Option, Some } from "@hazae41/option"
import { BytesOrCopiable, Copiable } from "libs/copiable/index.js"
import { fromBuffer } from "./buffer.js"

let global: Option<Adapter> = new Some(fromBuffer())

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {
  encodeOrThrow(bytes: BytesOrCopiable): string

  decodeOrThrow(text: string): Copiable

  padStartAndDecodeOrThrow(text: string): Copiable

  padEndAndDecodeOrThrow(text: string): Copiable
}

