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

  function tryEncode(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(getBytes(bytes)).toString("hex")
    }).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return Bytes.fromView(Buffer.from(text, "hex"))
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