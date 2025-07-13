import type * as Scure from "@scure/base"
import { BytesOrMemory, Slice } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { fromNative } from "./native.js"

export function fromNativeOrBufferOrScure(scure: typeof Scure) {
  if ("fromHex" in Uint8Array)
    return fromNative()
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof Scure) {
  const { base16 } = scure

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrMemory) {
    return base16.encode(getBytes(bytes)).toLowerCase()
  }

  function decodeOrThrow(text: string) {
    return new Slice(base16.decode(text.toUpperCase()))
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, decodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}