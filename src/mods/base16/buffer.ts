import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter, Copied } from "./base16.js"

export function fromBuffer(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => Buffers.fromView(bytes).toString("hex"))
  }

  function tryDecode(text: string) {
    return Result.runAndDoubleWrapSync(() => Bytes.fromView(Buffer.from(text, "hex"))).mapSync(Copied.new)
  }

  return { tryEncode, tryDecode }
}