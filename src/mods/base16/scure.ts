import { Result } from "@hazae41/result"
import type { base16 } from "@scure/base"
import { Adapter, Copied } from "./base16.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrScure(scure: typeof base16) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof base16): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => scure.encode(bytes))
  }

  function tryDecode(text: string) {
    return Result.runAndDoubleWrapSync(() => scure.decode(text)).mapSync(Copied.new)
  }

  return { tryEncode, tryDecode }
}