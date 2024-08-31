import type { Base16Wasm } from "@hazae41/base16.wasm"
import { Box } from "@hazae41/box"
import { BytesOrCopiable } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrWasm(wasm: typeof Base16Wasm) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromWasm(wasm)
}

export function fromWasm(wasm: typeof Base16Wasm) {
  const { Memory, base16_encode_lower, base16_decode_mixed } = wasm

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Memory)
      return Box.createAsMoved(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.create(new Memory(bytesOrCopiable))
    return Box.create(new Memory(bytesOrCopiable.bytes))
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return base16_encode_lower(memory.inner)
  }

  function decodeOrThrow(text: string) {
    return base16_decode_mixed(text)
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}