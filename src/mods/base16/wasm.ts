import type { Base16Wasm } from "@hazae41/base16.wasm"
import { Ref } from "@hazae41/box"
import { BytesOrMemory } from "libs/memory/index.js"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { fromNative } from "./native.js"

export function fromNativeOrBufferOrWasm(wasm: typeof Base16Wasm) {
  if ("fromHex" in Uint8Array)
    return fromNative()
  if ("process" in globalThis)
    return fromBuffer()
  return fromWasm(wasm)
}

export function fromWasm(wasm: typeof Base16Wasm) {
  const { Memory, base16_encode_lower, base16_decode_mixed } = wasm

  function getMemory(bytesOrCopiable: BytesOrMemory) {
    if (bytesOrCopiable instanceof Memory)
      return Ref.with(bytesOrCopiable, () => { })

    if (bytesOrCopiable instanceof Uint8Array)
      return Ref.wrap(new Memory(bytesOrCopiable))

    return Ref.wrap(new Memory(bytesOrCopiable.bytes))
  }

  function encodeOrThrow(bytes: BytesOrMemory) {
    using memory = getMemory(bytes)

    return base16_encode_lower(memory.value)
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

  return { encodeOrThrow, decodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}