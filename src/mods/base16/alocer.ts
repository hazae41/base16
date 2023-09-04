import type { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./base16.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrAlocer(alocer: typeof Alocer) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromAlocer(alocer)
}

export function fromAlocer(alocer: typeof Alocer): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => alocer.base16_encode_lower(bytes))
  }

  function tryDecode(text: string) {
    return Result.runAndDoubleWrapSync(() => alocer.base16_decode_mixed(text))
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { tryEncode, tryPadStartAndDecode, tryPadEndAndDecode }
}