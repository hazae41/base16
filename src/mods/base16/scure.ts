import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { base16 } from "@scure/base"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromBufferOrScure() {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure()
}

export function fromScure(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    return base16.encode(getBytes(bytes))
  }

  function tryEncode(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeOrThrow(bytes)
    }).mapErrSync(EncodingError.from)
  }

  function decodeOrThrow(text: string) {
    return new Copied(base16.decode(text))
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return decodeOrThrow(text)
    }).mapErrSync(DecodingError.from)
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, tryEncode, padStartAndDecodeOrThrow, tryPadStartAndDecode, padEndAndDecodeOrThrow, tryPadEndAndDecode }
}