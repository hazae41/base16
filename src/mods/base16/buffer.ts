import { Slice } from "@hazae41/memory"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { BytesOrMemory } from "libs/memory/index.js"
import { Adapter } from "./adapter.js"
import { fromNative } from "./native.js"

export function fromNativeOrBuffer() {
  if ("fromHex" in Uint8Array)
    return fromNative()
  return fromBuffer()
}

export function fromBuffer() {

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrMemory) {
    return Buffers.fromView(getBytes(bytes)).toString("hex")
  }

  function decodeOrThrow(text: string) {
    return new Slice(Bytes.fromView(Buffer.from(text, "hex")))
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, decodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}