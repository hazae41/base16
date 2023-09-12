import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter, Copied } from "./adapter.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromBuffer(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => Buffers.fromView(bytes).toString("hex")).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => Bytes.fromView(Buffer.from(text, "hex"))).mapSync(Copied.new).mapErrSync(DecodingError.from)
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { tryEncode, tryPadStartAndDecode, tryPadEndAndDecode }
}