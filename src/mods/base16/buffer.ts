import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter } from "./adapter.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromBuffer(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("hex")
  }

  function tryEncode(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeOrThrow(bytes)
    }).mapErrSync(EncodingError.from)
  }

  function decodeOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "hex")))
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