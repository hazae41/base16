import { Alocer } from "@hazae41/alocer"
import { Box, BytesOrCopiable } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

export async function fromBufferOrAlocer() {
  if ("process" in globalThis)
    return fromBuffer()
  return await fromAlocer()
}

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Alocer.Memory)
      return Box.greedy(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.new(new Alocer.Memory(bytesOrCopiable))
    return Box.new(new Alocer.Memory(bytesOrCopiable.bytes))
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Alocer.base16_encode_lower(memory.inner)
  }

  function tryEncode(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Result.runAndWrapSync(() => {
      return Alocer.base16_encode_lower(memory.inner)
    }).mapErrSync(EncodingError.from)
  }

  function decodeOrThrow(text: string) {
    return Alocer.base16_decode_mixed(text)
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