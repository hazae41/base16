import { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

export async function fromBufferOrAlocer() {
  if ("process" in globalThis)
    return fromBuffer()
  return await fromAlocer()
}

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => Alocer.base16_encode_lower(bytes)).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => Alocer.base16_decode_mixed(text)).mapErrSync(DecodingError.from)
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { tryEncode, tryPadStartAndDecode, tryPadEndAndDecode }
}