import { BytesOrMemory, Memory } from "@hazae41/memory"
import { Nullable, Option, Some } from "@hazae41/option"
import { fromNativeOrBuffer } from "./buffer.js"

let global: Option<Adapter> = new Some(fromNativeOrBuffer())

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {
  encodeOrThrow(bytes: BytesOrMemory): string

  decodeOrThrow(text: string): Memory

  padStartAndDecodeOrThrow(text: string): Memory

  padEndAndDecodeOrThrow(text: string): Memory
}

