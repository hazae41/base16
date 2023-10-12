import { Alocer } from "@hazae41/alocer"
import { Box, Copiable } from "@hazae41/box"
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

  function getMemoryFromCopiable(copiable: Copiable) {
    if (copiable instanceof Alocer.Memory)
      /**
       * Wrap the memory in an undropable box
       */
      return Box.greedy(copiable)
    /**
     * Create a memory and wrap it in a dropable box
     */
    return Box.new(new Alocer.Memory(copiable.bytes))
  }

  function tryEncode(bytes: Copiable) {
    using memory = getMemoryFromCopiable(bytes)

    return Result.runAndWrapSync(() => {
      return Alocer.base16_encode_lower(memory.inner)
    }).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return Alocer.base16_decode_mixed(text)
    }).mapErrSync(DecodingError.from)
  }

  function tryPadStartAndDecode(text: string) {
    return tryDecode(text.length % 2 ? "0" + text : text)
  }

  function tryPadEndAndDecode(text: string) {
    return tryDecode(text.length % 2 ? text + "0" : text)
  }

  return { tryEncode, tryPadStartAndDecode, tryPadEndAndDecode }
}