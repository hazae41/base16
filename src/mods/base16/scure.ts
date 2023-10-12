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

  function tryEncode(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return base16.encode(getBytes(bytes))
    }).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return base16.decode(text)
    }).mapSync(Copied.new).mapErrSync(DecodingError.from)
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { tryEncode, tryPadStartAndDecode, tryPadEndAndDecode }
}